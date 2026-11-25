package com.spooksandclay.backend.product;

import com.spooksandclay.backend.error.ProductNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductDto> getAll(Pageable pageable, String category, boolean includeInactive) {
       Page<Product> productPage;

       if(includeInactive) {
          productPage = (category == null)
          ? productRepository.findAll(pageable)
          : productRepository.findByCategory(category, pageable);
       } else {
           productPage = (category == null)
           ? productRepository.findAvailable(pageable)
           : productRepository.findAvailableByCategory(category, pageable);
       }
        return productPage.map(product -> toDto(product));
    }


    public Page<ProductDto> getFeatured(Pageable pageable) {
        return productRepository.findFeatured(pageable).map(product -> toDto(product));
    }


    public Optional<ProductDto> getBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .filter(product -> product.isActive())
                .map(product -> toDto(product));
    }

    public ProductDto getById(Long id) {
        return productRepository.findById(id)
                .map(product -> toDto(product))
                .orElseThrow(() -> new ProductNotFoundException("Product not found!"));
    }

    private ProductDto toDto(Product product) {

        List<ProductImageDto> imageDtos = product.getImages().stream().map(img -> new ProductImageDto(img.getSrc(), img.getAlt())).toList();

        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getShortDesc(),
                product.getLongDesc(),
                product.getPrice().toString(),
                product.isOnSale(),
                product.getDiscountPercent(),
                product.getStockCount(),
                product.getCreatedAt().toString(),
                product.getCategory(),
                imageDtos,
                product.isFeatured(),
                product.getHeightCm(),
                product.getWidthCm(),
                product.getWeightG(),
                List.copyOf(product.getMaterials()),
                product.isActive()
        );
    }

    private List<ProductImage>toProductImages(List<ProductImageDto> dtos) {
        return dtos.stream()
                .map(dto -> {
                    ProductImage image = new ProductImage();
                    image.setSrc(dto.src());
                    image.setAlt(dto.alt());
                    return image;
                }).toList();

    }

    public ProductDto create(CreateProductRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setSlug(request.slug());
        applyRequest(product, request);
        return toDto(productRepository.save(product));
    }

    public ProductDto update(Long id, CreateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
       applyRequest(product, request);
       return toDto(productRepository.save(product));
    }

    private void applyRequest(Product product, CreateProductRequest request) {
        product.setName(request.name());
        product.setShortDesc(request.shortDesc());
        product.setLongDesc(request.longDesc());
        product.setPrice(request.price());
        product.setOnSale(request.onSale());
        product.setDiscountPercent(request.onSale() ? request.discountPercent() : null);
        product.setStockCount(request.stockCount());
        product.setCategory(request.category());
        product.setImages(toProductImages(request.images()));
        product.setFeatured(request.featured());
        product.setActive(request.active());
        product.setHeightCm(request.heightCm());
        product.setWidthCm(request.widthCm());
        product.setWeightG(request.weightG());
        product.setMaterials(request.materials());

    }


    public void delete(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not found!"));
        product.setActive(false);
        productRepository.save(product);
    }
}
