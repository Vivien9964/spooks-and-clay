
import { useCartStore } from "@/store/cartStore"
import { cartTotal, formatLei } from "@/utils/price"
import { useUIStore } from "@/store/uiStore"
import { useNavigate } from "react-router-dom"
import { useModalDialog } from "@/hooks/useModalDialog"
import CartItem from "@/features/cart/CartItem"
import Button from "@/components/ui/Button"
import { X } from "lucide-react"


function CartDrawer() {
    
    const navigate = useNavigate()
    const items = useCartStore((s) => s.items)
    const clearCart = useCartStore((s) => s.clearCart)
    const isCartOpen = useUIStore((s) => s.isCartOpen)
    const closeCart = useUIStore((s) => s.closeCart)

    const drawerRef = useModalDialog<HTMLElement>(isCartOpen, closeCart)

    if(!isCartOpen) return null;

    const total = cartTotal(items)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const goTo = (path: string) => {
        closeCart()
        navigate(path)
    }

    return (
        <div className="fixed inset-0 z-[60]">

            <div
                className="absolute inset-0 bg-bark-900/40 animate-fade-in"
                onClick={closeCart}
                aria-hidden="true"
            />
 
            <aside
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
                className="absolute top-0 right-0 h-full w-full max-w-md bg-cream-50 shadow-lift flex flex-col sm:rounded-l-[2rem] animate-drawer-in"
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <h2 id="cart-title" className="font-heading font-semibold text-2xl text-bark-900">
                        Your cart
                        {itemCount > 0 && (
                            <span className="ml-2 font-body font-normal text-base text-bark-500">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        )}
                    </h2>
                    <button
                        type="button"
                        onClick={closeCart}
                        aria-label="Close cart"
                        className="p-2 rounded-full text-bark-700 hover:bg-cream-200 hover:text-bark-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700"
                    >
                        <X size={22} aria-hidden="true" />
                    </button>
                </div>
 
                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 pb-16 text-center">
                        <img
                            src="/redesignImages/tinyPumpkins.jpeg"
                            alt=""
                            className="w-36 aspect-square object-cover blob-3 shadow-soft ring-4 ring-cream-100 motion-safe:animate-float"
                        />
                        <p className="font-heading font-semibold text-xl text-bark-900 mt-2">Your cart is empty.</p>
                        <p className="font-body text-bark-700">A little spook is waiting to be adopted.</p>
                        <Button variant="primary" className="mt-2" onClick={() => goTo("/shop")}>
                            Find your little spook
                        </Button>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 overflow-y-auto px-6 divide-y divide-cream-200">
                            {items.map((item) => (
                                <CartItem key={item.product.id} item={item} onNavigate={closeCart} />
                            ))}
                        </ul>

                        <div className="px-6 pt-4 pb-6 bg-cream-100 sm:rounded-bl-[2rem] flex flex-col gap-3">
                            <div className="flex justify-between items-baseline font-body text-bark-900">
                                <span className="font-semibold">Total</span>
                                <span className="font-heading font-semibold text-xl">{formatLei(total)}</span>
                            </div>
                            <Button variant="primary" size="lg" className="w-full" onClick={() => goTo("/checkout")}>
                                Checkout
                            </Button>
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={closeCart}
                                    className="font-body text-sm text-bark-700 underline underline-offset-4 decoration-bark-300 hover:text-bark-900 hover:decoration-bark-900 cursor-pointer"
                                >
                                    Keep browsing
                                </button>
                                <Button variant="ghost" size="sm" onClick={clearCart}>Clear cart</Button>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </div>
    )
}

export default CartDrawer
