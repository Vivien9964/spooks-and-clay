
import type { Product } from "@/types/product";

export function isAvailable(product: Product): boolean {

    return product.stockCount > 0;
}