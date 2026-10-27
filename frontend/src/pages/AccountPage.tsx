
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { Ghost, LogOut, PackageCheck, Truck, Clock, XCircle, CreditCard, Mail } from "lucide-react"

import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import SlowLoadNotice from "@/components/SlowLoadNotice"
import { buttonClasses, textLinkClasses } from "@/components/ui/buttonStyles"

import { useAuthStore } from "@/store/authStore"
import { useOrders } from "@/hooks/useOrders"
import { useIsSlow } from "@/hooks/useIsSlow"
import { formatLei } from "@/utils/price"
import { formatDate } from "@/utils/date"
import { socials } from "@/data/socials"
import type { Order, OrderStatus } from "@/types/order"


// Styling options for order status based on current status
const statusVariantMap: Record<OrderStatus, "positive" | "payment" | "neutral" | "warning"> = {
    delivered: "positive",
    shipped: "neutral",
    paid: "payment",
    pending: "warning",
    cancelled: "warning",
}

// Icons fo order status based on current status
const statusIconMap: Record<OrderStatus, React.ElementType> = {
    delivered: PackageCheck,
    shipped: Truck,
    paid: CreditCard,
    pending: Clock,
    cancelled: XCircle,
}

// Order status progress
const progressSteps: { status: OrderStatus, label: string }[] = [
    { status: "pending", label: "Placed" },
    { status: "paid", label: "Paid" },
    { status: "shipped", label: "Shipped" },
    { status: "delivered", label: "Delivered" },
]

// Returns an order status badge based on order status: icon + badge color + status
function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const StatusIcon = statusIconMap[status]
    return (
        <Badge variant={statusVariantMap[status]} className="inline-flex items-center gap-1 capitalize">
            <StatusIcon className="w-3 h-3" aria-hidden="true" />
            {status}
        </Badge>
    )
}


// Returns progress steps based on status
function OrderProgress({ status }: { status: OrderStatus }) {
    if (status === "cancelled") return null

    const currentIndex = progressSteps.findIndex((step) => step.status === status)

    return (
        <ol aria-hidden="true" className="flex items-start mt-4 mb-1">
            {progressSteps.map((step, index) => {
                const isReached = index <= currentIndex
                return (
                    <li key={step.status} className="flex-1 flex flex-col items-center gap-1.5 relative">
                        {index > 0 && (
                            <span className={clsx(
                                "absolute top-[5px] right-1/2 w-full h-0.5",
                                isReached ? "bg-moss-500" : "bg-cream-300"
                            )} />
                        )}
                        <span className={clsx(
                            "relative w-3 h-3 rounded-full ring-4 ring-cream-50",
                            isReached ? "bg-moss-500" : "bg-cream-300",
                            index === currentIndex && "scale-125"
                        )} />
                        <span className={clsx(
                            "font-body text-xs",
                            isReached ? "text-bark-900 font-semibold" : "text-bark-500"
                        )}>
                            {step.label}
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}


// Returns a summary of the order with placement time, order status, products and total
function OrderCard({ order }: { order: Order }) {
    return (
        <article className="bg-cream-50 rounded-[1.5rem] p-5 sm:p-6 shadow-soft">

            <div className="flex justify-between items-start gap-3">
                <div>
                    <h3 className="font-heading font-semibold text-lg text-bark-900">Order #{order.id}</h3>
                    <p className="font-body text-sm text-bark-500 mt-0.5">
                        <time dateTime={order.orderedAt}>{formatDate(order.orderedAt)}</time>
                    </p>
                </div>
                <OrderStatusBadge status={order.status} />
            </div>

            <OrderProgress status={order.status} />

            <ul className="mt-4 flex flex-col divide-y divide-cream-200">
                {order.items.map((item) => (
                    <li key={`${order.id}-${item.productId}`} className="flex justify-between items-center gap-3 py-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 blob-1 bg-honey-300 text-bark-900 font-heading font-semibold flex items-center justify-center shrink-0" aria-hidden="true">
                                {item.productName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="font-body text-bark-900 truncate">{item.productName}</span>
                                {item.variant && (
                                    <span className="text-xs bg-cream-200 text-bark-700 px-2 py-0.5 rounded-full self-start">{item.variant}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 font-body text-sm">
                            {item.quantity > 1 && (
                                <span className="text-bark-500">{item.quantity} x {formatLei(item.unitPrice)}</span>
                            )}
                            <span className="text-bark-900 font-semibold">{formatLei(item.unitPrice * item.quantity)}</span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-baseline mt-2 pt-3 border-t border-cream-200">
                <span className="font-body text-bark-700 font-semibold">Total</span>
                <span className="font-heading font-semibold text-xl text-bark-900">
                    {formatLei(order.total)}
                </span>
            </div>

        </article>
    )
}


function AccountPage() {

    // Get user and logout from AuthStore
    const user = useAuthStore((s) => s.user)
    const logOut = useAuthStore((s) => s.logout)
    const navigate = useNavigate()

    const { orders, loadingStatus, errors, refetch } = useOrders(user?.id ?? 0)
    const isSlow = useIsSlow(loadingStatus === "loading")

    if(!user) {
        return null;
    }

    const firstName = user.name.trim().split(" ")[0]
    
    const handleLogout = () => {
        logOut()
        navigate("/")
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-16">

            <div className="mb-8 md:mb-10">
                <h1 className="font-display text-6xl md:text-7xl text-bark-900">Account</h1>
                <p className="font-heading text-xl md:text-2xl text-bark-700 mt-2">
                    Good to see you, <span className="text-pumpkin-700">{firstName}</span>.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                <aside className="w-full md:w-72 shrink-0 md:sticky md:top-24 flex flex-col gap-4">
                    <div className="bg-cream-50 rounded-[1.5rem] p-6 shadow-soft text-center">

                        <div
                            className="w-16 h-16 rounded-full bg-moss-500 text-cream-50 font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4"
                            aria-hidden="true"
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <p className="font-heading font-semibold text-xl text-bark-900">{user.name}</p>
                        <p className="font-body text-sm text-bark-700 mt-1 break-all">{user.email}</p>
                        <p className="font-body text-xs text-bark-500 mt-3">
                            Member since {formatDate(user.createdAt, "long")}
                        </p>

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleLogout}
                            className="mt-5">
                            <LogOut className="w-4 h-4" aria-hidden="true" />
                            Log out
                        </Button>

                    </div>

                    {/* Reach out to the admin  */}
                    <div className="bg-honey-100 rounded-[1.5rem] p-5 flex gap-3 items-start">
                        <Mail className="w-5 h-5 text-bark-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="font-body text-sm text-bark-700">
                            Questions about an order? There's a real human here.{" "}
                            <a href={socials.email.href} className={textLinkClasses}>Say hello</a>
                        </p>
                    </div>
                </aside>

                {/* Orders  */}
                <section className="flex-1 min-w-0" aria-labelledby="orders-title">

                    <div className="flex items-baseline gap-2 mb-4">
                        <h2 id="orders-title" className="font-heading font-semibold text-2xl text-bark-900">Your orders</h2>
                        {loadingStatus === "success" && orders.length > 0 && (
                            <span className="font-body text-sm text-bark-500">
                                {orders.length} {orders.length === 1 ? "order" : "orders"}
                            </span>
                        )}
                    </div>
                    
                    {/* Handle slow loading, loading error, no order history: 
                        - show slow load notice
                        - in case load fails after some time, show try again button for refetch
                        - in case there is no order, show CTA to prompt users to visit the shop

                        Upon successful loading: show order history 
                    */}
                    {loadingStatus === "loading" ? (

                        <>
                            {isSlow && <SlowLoadNotice className="mb-4" />}

                            <div className="flex flex-col gap-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="bg-cream-50 rounded-[1.5rem] shadow-soft p-5 h-44 animate-pulse" />
                                ))}
                            </div>
                        </>

                    ) : loadingStatus === "error" ? (

                        <div className="bg-cream-50 rounded-[2rem] shadow-soft p-12 md:p-16 flex flex-col items-center gap-4 text-center">
                            <h3 className="font-heading font-semibold text-2xl text-bark-900">We couldn't load your orders.</h3>
                            <p className="font-body text-bark-700">{errors ?? "Something went wrong. Please try again."}</p>
                            <Button variant="primary" onClick={refetch}>Try again</Button>
                        </div>

                    ) : orders.length === 0 ? (

                        <div className="bg-cream-50 rounded-[2rem] shadow-soft p-12 flex flex-col items-center text-center gap-3">
                            <Ghost className="w-12 h-12 text-bark-500 mb-2 motion-safe:animate-bounce" aria-hidden="true" />
                            <h3 className="font-heading font-semibold text-xl text-bark-900">No orders yet</h3>
                            <p className="font-body text-bark-700">Your spooks will show up here once you adopt one.</p>
                            <Link to="/shop" className={buttonClasses("primary", "mt-4")}>
                                Find your little spook
                            </Link>
                        </div>

                    ) : (

                        <div className="flex flex-col gap-4">
                            {orders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>

                    )}

                </section>

            </div>

        </div>
    )
}

export default AccountPage
