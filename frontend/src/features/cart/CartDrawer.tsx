
import { useCart } from "@/features/cart/CartContext"
import CartItem from "@/features/cart/CartItem"
import Button from "@/components/ui/Button"
import { X } from "lucide-react"

function CartDrawer() {
    const { items, isCartOpen, closeCart, clearCart } = useCart()

    if(!isCartOpen) return null;

    const total = items.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0)

    return (
        <div className="fixed inset-0 z-50">

            <div
                className="absolute inset-0 bg-bark-900/40"
                onClick={closeCart}
            />
 
            <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-cream-50 shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-cream-300">
                    <h2 className="font-display text-2xl text-bark-900">Your Cart</h2>
                    <button onClick={closeCart} className="text-bark-500 hover:text-pumpkin-700">
                        <X size={24} />
                    </button>
                </div>
 
                <div className="flex-1 overflow-y-auto px-4">
                    {items.length === 0 ? (
                        <p className="text-bark-500 text-center mt-10">Your cart is empty.</p>
                    ) : (
                        items.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))
                    )}
                </div>
 
                {items.length > 0 && (
                    <div className="p-4 border-t border-cream-300 flex flex-col gap-3">
                        <div className="flex justify-between font-body font-bold text-bark-900">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button variant="primary" className="w-full">Checkout</Button>
                        <Button variant="ghost" onClick={clearCart}>Clear cart</Button>
                    </div>
                )}
            </aside>
        </div>
    )
}

export default CartDrawer