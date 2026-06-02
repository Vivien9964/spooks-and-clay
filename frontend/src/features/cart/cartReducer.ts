
import type { CartAction, CartItem } from "@/types/cart"


export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch(action.type) {
        
        case "ADD_ITEM": {

            const item = state.find((item) => item.product.id === action.payload.id);

            if(!item) {
                const newItem  = { product: action.payload, quantity: 1}
                return [...state, newItem]

            } else {
                return state.map((item) => item.product.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item)
            }
        }

        case "REMOVE_ITEM": {
            return state.filter((item) => item.product.id !== action.payload.id)
        }

        case "UPDATE_QTY": {
            return state.map((item) => item.product.id === action.payload.id ? {...item, quantity: action.payload.quantity } : item)
        }

        case "CLEAR_CART": {
            return []
        }

        default: 
            return state;
    }
}
