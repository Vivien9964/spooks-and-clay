import type { Product } from "@/types/product"
import type { ProductDto, Page } from "@/types/api"
import { http } from "@/services/http"


export async function getProducts(): Promise<Product[]> {

    const res = await http<Page<ProductDto>>("/products")

    return res.content.map((product) => toProduct(product))

    // return [...products]
}

export async function getProductBySlug(slug: string): Promise<Product> {
   
   // const product = products.find((product) => product.slug === slug)

   const product = await http<ProductDto>(`/products/${slug}`)

    return toProduct(product)
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
        tags: dto.tags ?? [],
        images: dto.images,
        slug: dto.slug,
        ...discount
    }
}
