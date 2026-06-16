import type { CartItem as CartItemType } from "@/types/cart"
import { useCartStore } from "@/store/cartStore"
import QuantitySelector from "@/components/ui/QuantitySelector"
import { Trash2 } from "lucide-react"

type CartItemProps = {
    item: CartItemType
}

function CartItem({ item }: CartItemProps) {

    const updateQty = useCartStore((s) => s.updateQty)
    const removeItem = useCartStore((s) => s.removeItem)

   return (
    <div className="flex items-center gap-4 py-3 border-b border-cream-300">
        <img
            src={item.product.images[0].src}
            alt={item.product.images[0].alt}
            className="w-16 h-16 object-cover rounded-lg"
        />

        <div className="flex-1">
            <p className="font-body font-bold text-bark-900">{item.product.name}</p>
            <p className="text-bark-500 text-sm">
                {(item.product.basePrice * item.quantity).toFixed(2)} Lei
            </p>
        </div>

        <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => updateQty(item.product.id, item.quantity + 1)}
            onDecrement={() => updateQty(item.product.id, item.quantity - 1)}
            max={item.product.stockCount}
        />

        <button
            onClick={() => removeItem(item.product.id)}
            className="text-bark-500 hover:text-pumpkin-700"
        >
            <Trash2 size={18} />
        </button>
    </div>
)
}

export default CartItem