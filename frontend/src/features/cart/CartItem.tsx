import type { CartItem as CartItemType } from "@/types/cart"
import { Link } from "react-router-dom"
import { useCartStore } from "@/store/cartStore"
import { lineTotal, formatLei } from "@/utils/price"
import { isAvailable } from "@/utils/availability"
import { Trash2 } from "lucide-react"
import clsx from "clsx"


type CartItemProps = {
    item: CartItemType
    onNavigate?: () => void
}

function CartItem({ item, onNavigate }: CartItemProps) {

    const removeItem = useCartStore((s) => s.removeItem)

    const { product, quantity } = item
    const image = product.images[0]
    const productLink = `/product/${product.slug}`
    const available = isAvailable(product)

   return (
    <li className="flex gap-4 py-4">
        <Link to={productLink} onClick={onNavigate} tabIndex={-1} aria-hidden="true" className="shrink-0">
            <img
                src={image?.src}
                alt=""
                className={clsx("w-20 h-20 object-cover rounded-2xl shadow-soft", !available && "opacity-60")}
            />
        </Link>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
                <Link
                    to={productLink}
                    onClick={onNavigate}
                    className="font-heading font-semibold text-bark-900 leading-snug hover:text-pumpkin-700 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700"
                >
                    {product.name}
                </Link>
                <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="shrink-0 p-1.5 -mr-1.5 rounded-full text-bark-500 hover:text-berry-500 hover:bg-cream-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700"
                >
                    <Trash2 size={16} aria-hidden="true" />
                </button>
            </div>

            <div className="mt-auto flex items-center justify-end gap-2">
                {available ? (
                    <span className="font-body font-bold text-bark-900">
                        {product.isOnSale && (
                            <s className="mr-2 font-normal text-sm text-bark-500">{formatLei(product.basePrice * quantity)}</s>
                        )}
                        <span className={product.isOnSale ? "text-berry-500" : undefined}>{formatLei(lineTotal(item))}</span>
                    </span>
                ) : (
                    <span className="font-body text-sm italic text-bark-700">Already found a home</span>
                )}
            </div>
        </div>
    </li>
)
}

export default CartItem
