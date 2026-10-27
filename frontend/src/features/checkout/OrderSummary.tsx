import clsx from "clsx"
import type { CartItem } from "@/types/cart"
import { lineTotal, formatLei } from "@/utils/price"

type OrderSummaryProps = {
    items: CartItem[]
    total: number
    className?: string
}

function OrderSummary({ items, total, className }: OrderSummaryProps) {

    // Total items
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <aside aria-labelledby="summary-title" className={clsx("bg-cream-50 rounded-[2rem] shadow-soft p-6", className)}>
            {/* Title + item count */}
            <h2 id="summary-title" className="font-heading font-semibold text-xl text-bark-900">
                Your order
                <span className="ml-2 font-body font-normal text-base text-bark-500">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
            </h2>

            {/* List of order items */}
            <ul className="mt-4 flex flex-col divide-y divide-cream-200">
                {items.map((item) => (
                    // Order item with image, quantity, product name, price
                    <li key={item.product.id} className="flex items-center gap-3 py-3">
                        <div className="relative shrink-0">
                            <img
                                src={item.product.images[0]?.src}
                                alt=""
                                className="w-14 h-14 object-cover rounded-xl"
                            />
                            {item.quantity > 1 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-bark-900 text-cream-50 text-xs font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
                                    {item.quantity}
                                </span>
                            )}
                        </div>
                        <span className="flex-1 min-w-0 font-body text-bark-900 leading-snug">
                            {item.product.name}
                            {item.quantity > 1 && <span className="sr-only">, quantity {item.quantity}</span>}
                        </span>
                        <span className="font-body font-semibold text-bark-900 shrink-0">{formatLei(lineTotal(item))}</span>
                    </li>
                ))}
            </ul>

            {/* Total price */}
            <div className="flex justify-between items-baseline mt-2 pt-4 border-t border-cream-300">
                <span className="font-body font-semibold text-bark-900">Total</span>
                <span className="font-heading font-semibold text-2xl text-bark-900">{formatLei(total)}</span>
            </div>
        </aside>
    )
}

export default OrderSummary
