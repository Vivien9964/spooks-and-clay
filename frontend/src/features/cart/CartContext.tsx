import { createContext, useReducer, useContext, useState, type ReactNode } from "react";
import type { CartContextValue } from "@/types/cart"
import { cartReducer } from "@/features/cart/cartReducer"
import type { Product } from "@/types/product";

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

    const [ items, dispatch ] = useReducer(cartReducer, [])
    const [ isCartOpen, setIsCartOpen ] = useState(false)

    const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product })
    const removeItem = (id: number) => dispatch({ type: "REMOVE_ITEM", payload: { id } })
    const updateQty = (id: number, quantity: number) => dispatch({ type: "UPDATE_QTY", payload: { id, quantity } })
    const clearCart = () => dispatch({ type: "CLEAR_CART" })

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    const value: CartContextValue = {
        items, 
        addItem, 
        removeItem, 
        updateQty,
        clearCart,
        isCartOpen,
        openCart,
        closeCart
    }

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)

    if(!context) {
        throw new Error("useCart must be used within a CartProvider")
    }

    return context
}