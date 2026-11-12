import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import { getProductBySlug } from "@/services/products"
import { ApiError } from "@/services/http"
import type { Product } from "@/types/product"
import type { CartItem } from "@/types/cart"

// Asks the server for the current state of each cart item. Doesn't touch the store.
export async function fetchCartStatus(items: CartItem[]) {
    const results = await Promise.allSettled(
        items.map((item) => getProductBySlug(item.product.slug))
    )

    const fresh: Product[] = []
    const goneIds: number[] = []

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            fresh.push(result.value)
        } else if (result.reason instanceof ApiError && result.reason.status === 404) {
            goneIds.push(items[index].product.id)
        }
        // any other error: do nothing, keep the saved copy
    })

    return { fresh, goneIds }
}

export function useCartCheck(enabled: boolean) {
    useEffect(() => {
        if (!enabled) return

        const items = useCartStore.getState().items
        if (items.length === 0) return

        let ignore = false

        fetchCartStatus(items).then(({ fresh, goneIds }) => {
            if (!ignore) useCartStore.getState().syncProducts(fresh, goneIds)
        })

        return () => { ignore = true }
    }, [enabled])
}
