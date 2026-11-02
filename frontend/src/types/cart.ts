
import type { Product } from "@/types/product"

export type CartAction = 
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: { id: number }}
    | { type: "CLEAR_CART" }

export type CartItem = {
    product: Product;
    quantity: number;
}

export type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;

}
