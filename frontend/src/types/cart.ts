
import type { Product } from "@/types/product"

export type CartAction = 
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: { id: number }}
    | { type: "UPDATE_QTY"; payload: { id: number; quantity: number }}
    | { type: "CLEAR_CART" }

export type CartItem = {
    product: Product;
    quantity: number;
}

export type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;

}
