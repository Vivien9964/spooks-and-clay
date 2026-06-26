
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/product"

type CartStore = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  
  
  persist(
    (set) => ({

      items: [],
 
      addItem: (product) =>
        set((state) => {
          const item = state.items.find((i) => i.product.id === product.id)
    
          if (!item) {
            return { items: [...state.items, { product, quantity: 1 }] }
          } else {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
        }),
    
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),
 
      updateQty: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id ? { ...i, quantity } : i
          ),
        })),
 
      clearCart: () => set(() => ({ items: [] })),
      }),
    {
      name: "cart-storage",
    }
  )
)