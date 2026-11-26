import type { Product } from "@/types/product"
import type { ProductDto, Page, CreateProductRequestDto } from "@/types/api"
import { http } from "@/services/http"
import { toProduct } from "@/services/products"

// Admin sees hidden and sold pieces with newest ones first
export async function getAdminProducts(): Promise<Product[]> {
    const res = await http<Page<ProductDto>>("/products?includeInactive=true&size=100&sort=createdAt,desc")
    
    return res.content.map((product) => toProduct(product))
}

export async function getAdminProductById(id: number): Promise<Product> {
    const product = await http<ProductDto>(`/products/id/${id}`)

    return toProduct(product)
}

export async function createProduct(request: CreateProductRequestDto): Promise<Product> {
    const product = await http<ProductDto>("/products", { method: "POST", body: request })
    
    return toProduct(product)

}

export async function updateProduct(id: number, request: CreateProductRequestDto): Promise<Product> {
    const product = await http<ProductDto>(`/products/${id}`, { method: "PUT", body: request })

    return toProduct(product)

}

// Order history points at the row
// Soft delete on the server by setting active = false
export async function hideProduct(id: number): Promise<void> {
    await http<void>(`/products/${id}`, { method: "DELETE" })
}


// Turn what the UI holds back into what the server expects
export function toProductRequest(product: Product): CreateProductRequestDto {
    return {
        name: product.name,
        slug: product.slug,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        price: product.basePrice,
        onSale: product.isOnSale,
        discountPercent: product.isOnSale ? product.discountPercent : null,
        stockCount: product.stockCount,
        category: product.category,
        images: product.images,
        featured: product.isFeatured ?? false,
        active: product.isActive,
        heightCm: product.heightCm,
        widthCm: product.widthCm,
        weightG: product.weightG,
        materials: product.materials,
    }
}
