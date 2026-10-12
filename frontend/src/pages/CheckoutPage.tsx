import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { checkoutSchema, type CheckoutValues } from "@/features/checkout/checkoutSchema"
import { createOrder } from "@/services/orders"
import { useCartStore } from "@/store/cartStore"
import { cartTotal, lineTotal, formatLei } from "@/utils/price"

import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

function CheckoutPage() {

    const items = useCartStore((s) => s.items)
    const clearCart = useCartStore((s) => s.clearCart)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { country: "RO" }
    })

    const total = cartTotal(items)

    const onSubmit = async (data: CheckoutValues) => {
        try {
            const order = await createOrder({
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity
                })),
                ...data
            })

            clearCart()
            toast.success(`Order #${order.id} confirmed! Preparing it now!`)
            navigate("/account")

        } catch {
            toast.error("We couldn't place your order. Your cart is safe, please try again.")
        }
    }

    if (items.length === 0) {
        return (
            <div className="max-w-md mx-auto mt-20 mb-12 text-center">
                <h1 className="font-display text-2xl text-bark-900">No little spooks yet</h1>
                <p className="font-body text-sm text-bark-500 mt-3">Plenty of them waiting to be adopted.</p>
                <Link to="/shop">
                    <Button variant="primary" className="mt-6">Find a spook</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto mt-20 mb-12 bg-cream-50 rounded-2xl border border-cream-300 shadow-sm p-8">

            <h1 className="font-display text-2xl text-bark-900">Checkout</h1>

            <p className="font-display text-xl text-bark-900">Just a few details and we'll wrap your order up!</p>

            <div className="mt-6 border-b border-cream-300 pb-5">

                <h2 className="font-display text-2xl text-bark-900">Your haul</h2>

                {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between font-body text-sm text-bark-700 py-1">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>{formatLei(lineTotal(item))}</span>
                    </div>
                ))}
                <div className="flex justify-between font-body font-bold text-bark-900 mt-3">
                    <span>Total</span>
                    <span>{formatLei(total)}</span>
                </div>
            </div>

            <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
                <Input label="Recipient name" error={errors.recipientName?.message} {...register("recipientName")} />
                <Input label="Street address" error={errors.street?.message} {...register("street")} />
                <Input label="City" error={errors.city?.message} {...register("city")} />
                <Input label="Region (optional)" error={errors.region?.message} {...register("region")} />
                <Input label="Postal code" error={errors.postalCode?.message} {...register("postalCode")} />
                <Input label="Country" error={errors.country?.message} {...register("country")} />
                <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} />

                <Button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 text-base">
                    {isSubmitting ? "Placing order..." : "Place order"}
                </Button>
            </form>
        </div>
    )
}

export default CheckoutPage

