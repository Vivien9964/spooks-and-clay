
import React from "react"
import { Link } from "react-router-dom"
import { Ghost, LogOut, PackageCheck, Truck, Clock, XCircle } from "lucide-react"

import { toast } from "sonner"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

import { useAuthStore } from "@/store/authStore"
import { useCartStore } from "@/store/cartStore"
import { orders } from "@/data/orders"
import { products } from "@/data/products"
import type { Order, OrderStatus } from "@/types/order"


const statusVariantMap: Record<OrderStatus, "positive" | "neutral" | "warning"> = {
    delivered: "positive",
    shipped: "neutral",
    pending: "warning",
    cancelled: "warning",
}

const statusIconMap: Record<OrderStatus, React.ElementType> = {
    delivered: PackageCheck,
    shipped: Truck,
    pending: Clock,
    cancelled: XCircle,
}


function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const StatusIcon = statusIconMap[status]
    return (
        <Badge variant={statusVariantMap[status]} className="inline-flex items-center gap-1">
            <StatusIcon className="w-3 h-3" aria-hidden="true" />
            {status}
        </Badge>
    )
}


function AccountPage() {

    const user = useAuthStore((s) => s.user)
    const addItem = useCartStore((s) => s.addItem)

    if(!user) {
        return null;
    }

    const orderHistory = orders.filter((order) => order.userId === user.id)

    function handleOrderAgain(order: Order) {
        order.items.forEach((item) => {
            const product = products.find((p) => p.name === item.productName)
            if (product) {
                for (let i = 0; i < item.quantity; i++) {
                    addItem(product)
                }
            }
        })
        toast.success("Items added to your cart!")
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

            <h1 className="font-display text-3xl md:text-4xl text-bark-900 mb-8">
                Happy haunting, <span className="text-plum-500">{user.name}</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                <aside className="w-full md:w-72 shrink-0 md:sticky md:top-8">
                    <div className="bg-cream-50 border border-cream-300 rounded-2xl p-6 shadow-sm">

                        <div
                            className="w-16 h-16 rounded-full bg-pumpkin-100 text-pumpkin-700 font-display text-2xl flex items-center justify-center mx-auto mb-4"
                            aria-hidden="true"
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <p className="font-display text-xl text-bark-900 text-center">{user.name}</p>
                        <p className="font-body text-sm text-bark-500 text-center mt-1">{user.email}</p>

                        <div className="border-t border-cream-300 my-4" />

                        <p className="font-body text-xs text-bark-300 text-center">
                            Member since {new Date(user.createdAt).toLocaleDateString()}
                        </p>

                        <Button variant="ghost" className="w-full mt-4 flex items-center justify-center gap-2 hover:text-pumpkin-700">
                            <LogOut className="w-4 h-4" aria-hidden="true" />
                            Log out
                        </Button>

                    </div>
                </aside>


                <main className="flex-1 min-w-0">

                    <div className="flex items-baseline gap-2 mb-4">
                        <h2 className="font-display text-xl text-bark-900">Order History</h2>
                        <span className="font-body text-sm text-bark-300">{orderHistory.length} orders</span>
                    </div>

                    {orderHistory.length === 0 ? (

                        <div className="bg-cream-50 border border-dashed border-cream-300 rounded-2xl p-12 flex flex-col items-center text-center gap-3">
                            <Ghost className="w-12 h-12 text-plum-300 mb-2 animate-bounce" aria-hidden="true" />
                            <p className="font-display text-xl text-bark-900">No orders yet</p>
                            <p className="font-body text-sm text-bark-500">A tiny spook is waiting for you...</p>
                            <Link to="/shop">
                                <Button variant="primary" className="mt-4">
                                    Browse the Shop
                                </Button>
                            </Link>
                        </div>

                    ) : (

                        <div className="flex flex-col gap-4">
                            {orderHistory.map((order) => (
                                <div key={order.orderId} className="bg-cream-50 border border-cream-300 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-display text-base text-bark-900">Order #{order.orderId}</p>
                                            <p className="font-body text-xs text-bark-400 mt-0.5">
                                                {new Date(order.orderedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <OrderStatusBadge status={order.status} />
                                    </div>

                                    <div className="border-t border-cream-200 mb-3" />

                                    <div className="flex flex-col gap-1">
                                        {order.items.map((item) => (
                                            <div key={`${item.productName}-${order.orderId}`} className="flex justify-between items-center py-1.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-pumpkin-100 text-pumpkin-700 font-display text-sm flex items-center justify-center shrink-0" aria-hidden="true">
                                                        {item.productName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-body text-sm text-bark-700">{item.productName}</span>
                                                        {item.variant && (
                                                            <span className="text-xs bg-cream-200 text-bark-500 px-2 py-0.5 rounded-full self-start">{item.variant}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-body text-xs text-bark-300">x{item.quantity}</span>
                                                    <span className="font-body text-sm text-bark-500">${item.unitPrice.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-cream-200 mt-2 mb-3" />

                                    <div className="flex justify-between items-center">
                                        <span className="font-body text-sm text-bark-500 font-semibold">Order total</span>
                                        <span className="font-display text-lg text-pumpkin-700">
                                            ${order.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0).toFixed(2)}
                                        </span>
                                    </div>

                                    {order.status === "delivered" && (
                                        <Button
                                            variant="secondary"
                                            className="w-[50%] mt-3 flex items-center justify-center gap-2"
                                            onClick={() => handleOrderAgain(order)}
                                        >
                                            Order again
                                        </Button>
                                    )}

                                </div>
                            ))}
                        </div>

                    )}

                </main>

            </div>

        </div>
    )
}

export default AccountPage