
import { products } from "@/data/products"
import type { Product } from "@/types/product"
import type { ProductDto } from "@/types/api"


export async function getProducts(): Promise<Product[]> {
    return [...products]
}

export async function getProductBySlug(slug: string): Promise<Product> {
    const product = products.find((product) => product.slug === slug)

    if(!product) {
        throw new Error("Product not found!")
    }

    return product
}

export function toProduct(dto: ProductDto): Product {

    const discount = dto.onSale
        ? { isOnSale: true as const, discountPercent: dto.discountPercent ?? 0}
        : { isOnSale: false as const}



    return {
        id: dto.id,
        name: dto.name,
        category: dto.category,
        shortDesc: dto.shortDesc,
        longDesc: dto.longDesc,
        basePrice: Number(dto.price), 
        stockCount: dto.stockCount,
        tags: dto.tags,
        images: dto.images,
        slug: dto.slug,
        ...discount
    }
}
