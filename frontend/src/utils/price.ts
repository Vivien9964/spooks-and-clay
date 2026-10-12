import type { Product } from "@/types/product"
import type { CartItem } from "@/types/cart"

export function effectivePrice(product: Product): number {
    if (!product.isOnSale) return product.basePrice
    if (product.discountPercent <= 0) return product.basePrice

    const discounted = (product.basePrice * (100 - product.discountPercent)) / 100
    return Math.round(discounted * 100) / 100
}


export function lineTotal(item: CartItem): number {
    return effectivePrice(item.product) * item.quantity
}

export function cartTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + lineTotal(item), 0)
}


export function formatLei(amount: number): string {
    return `${amount.toFixed(2)} Lei`
}