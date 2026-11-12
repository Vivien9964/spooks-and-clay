
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/product"
import { isAvailable } from "@/utils/availability"


type CartStore = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    syncProducts: (fresh: Product[], goneIds: number[]) => void;
}

export const useCartStore = create<CartStore>()(
  
  persist(
    (set) => ({

      items: [],
 
     addItem: (product) =>
        set((state) =>
          !isAvailable(product) || state.items.some((i) => i.product.id === product.id)
          ? state
          : { items: [...state.items, { product, quantity: 1 }] }
      ),
    
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),
 
      clearCart: () => set(() => ({ items: [] })),

      syncProducts: (fresh, goneIds) =>
        set((state) => ({
          items: state.items.map((item) => {
            const updated = fresh.find((p) => p.id === item.product.id)
            if (updated) return { ...item, product: updated }
            if (goneIds.includes(item.product.id)) {
              return { ...item, product: { ...item.product, stockCount: 0 } }
            }
            return item
          }),
        })),
      }),
    {
      name: "cart-storage",
    }
  )
)