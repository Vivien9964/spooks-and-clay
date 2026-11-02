
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/product"

type CartStore = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  
  persist(
    (set) => ({

      items: [],
 
      addItem: (product) =>
        set((state) =>
          state.items.some((i) => i.product.id === product.id)
            ? state
            : { items: [...state.items, { product, quantity: 1 }] }
      ),
    
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),
 
      clearCart: () => set(() => ({ items: [] })),
      }),
    {
      name: "cart-storage",
    }
  )
)