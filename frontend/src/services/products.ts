
import { products } from "@/data/products"
import type { Product } from "@/types/product"


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