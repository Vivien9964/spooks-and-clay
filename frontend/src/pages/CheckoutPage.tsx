import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { checkoutSchema, type CheckoutValues } from "@/features/checkout/checkoutSchema"
import { createOrder } from "@/services/orders"
import { useCartStore } from "@/store/cartStore"
import { cartTotal, formatLei } from "@/utils/price"
import { isAvailable } from "@/utils/availability"
import { euCountries } from "@/data/countries"
import OrderSummary from "@/features/checkout/OrderSummary"
import { useCartCheck, fetchCartStatus } from "@/hooks/useCartCheck"
import { ApiError } from "@/services/http"

import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { buttonClasses } from "@/components/ui/buttonStyles"

// Easy Tailwind values for styling the inputs
const fieldsetClasses = "flex flex-col gap-4"
const legendClasses = "font-heading font-semibold text-xl text-bark-900 mb-4"

function CheckoutPage() {

    // Get cart items and clear cart function from cartStore
    const items = useCartStore((s) => s.items)
    const clearCart = useCartStore((s) => s.clearCart)
    const removeItem = useCartStore((s) => s.removeItem)
    const navigate = useNavigate()

    // Verify checkout values against rules defined in Zod
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { country: "RO" }
    })

    // Calculate the cart total from utils/price and count items
    const total = cartTotal(items)
    const hasSoldItems = items.some((item) => !isAvailable(item.product))

    const removeSoldItems = () => {
        items
            .filter((item) => !isAvailable(item.product))
            .forEach((item) => removeItem(item.product.id))
    }

    // Validate checkout values and try to create an order
    const onSubmit = async (data: CheckoutValues) => {
        if (hasSoldItems) return

        try {
            const order = await createOrder({
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity
                })),
                ...data
            })

            // On successful create: clear cart, show success message and navigate to account
            clearCart()
            toast.success(`Order #${order.id} confirmed! Preparing it now!`)
            navigate("/account")

        } catch (error) {

            if(error instanceof ApiError && error.status === 409) {
                toast.error("One of your spooks was just adopted by someone else. We've updated your cart.")

                const { fresh, goneIds } = await fetchCartStatus(useCartStore.getState().items)
                useCartStore.getState().syncProducts(fresh, goneIds)
                return
            }

            toast.error("We couldn't place your order. Your cart is safe, please try again.")
        }
    }

    useCartCheck(true)

    // Component shown when user did not put products into their cart 
    if (items.length === 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 flex flex-col items-center text-center">
                <img
                    src="/redesignImages/tinyPumpkins.jpeg"
                    alt=""
                    className="w-40 aspect-square object-cover blob-3 shadow-soft ring-4 ring-cream-50 motion-safe:animate-float"
                />
                <h1 className="font-heading font-semibold text-2xl text-bark-900 mt-8">No little spooks yet</h1>
                <p className="font-body text-bark-700 mt-2">Plenty of them waiting to be adopted.</p>
                {/* CTA button */}
                <Link to="/shop" className={buttonClasses("primary", "mt-6")}>Find a spook</Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 pb-16">
            {/* Navigate to shop */}
            <Link to="/shop" className={buttonClasses("ghost", "-ml-3", "sm")}>
                <ChevronLeft size={16} aria-hidden="true" />
                Back to shop
            </Link>
            {/* Title */}
            <div className="mt-4 mb-8">
                <h1 className="font-display text-6xl md:text-7xl text-bark-900">Checkout</h1>
                <p className="font-heading text-xl text-bark-700 mt-2">Almost there. Where should your spook go?</p>
            </div>
            {/* Order details, two column grid */}
            <div className="grid lg:grid-cols-[1fr_24rem] gap-6 lg:gap-10 items-start">
                {/* Order summary with order items and total */}
                <OrderSummary items={items} total={total} className="lg:order-last lg:sticky lg:top-24" />
                
                {/* Shipping details with personal information */}
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-cream-50 rounded-[2rem] shadow-soft p-6 sm:p-8 flex flex-col gap-8"
                >
                    {/* Contact information: name + phone */}
                    <fieldset className={fieldsetClasses}>
                        <legend className={legendClasses}>Contact</legend>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input label="Full name" autoComplete="name" error={errors.recipientName?.message} {...register("recipientName")} />
                            <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
                        </div>
                    </fieldset>
                    
                    {/* Shipping details */}
                    <fieldset className={fieldsetClasses}>
                        {/* Address */}
                        <legend className={legendClasses}>Shipping address</legend>
                        <Input label="Street and number" autoComplete="address-line1" error={errors.street?.message} {...register("street")} />
                        {/* City, region */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
                            <Input label="County or region (optional)" autoComplete="address-level1" error={errors.region?.message} {...register("region")} />
                        </div>
                        {/* Postal code */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input label="Postal code" autoComplete="postal-code" error={errors.postalCode?.message} {...register("postalCode")} />
                            {/* Country of destination */}
                            <div className="relative">
                                <select
                                    id="checkout-country"
                                    autoComplete="country"
                                    aria-invalid={errors.country ? true : undefined}
                                    className="peer w-full appearance-none px-4 pt-5 pb-2 pr-10 rounded-xl border border-cream-300 hover:border-bark-300 bg-cream-50 text-bark-900 font-body text-base cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:border-pumpkin-500 focus:ring-pumpkin-500"
                                    {...register("country")}
                                >   
                                    {/* Country options */}
                                    {euCountries.map((country) => (
                                        <option key={country.code} value={country.code}>{country.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="checkout-country" className="absolute left-3 top-0 -translate-y-1/2 px-1 bg-cream-50 font-body text-xs text-bark-700 peer-focus:text-pumpkin-700 pointer-events-none">
                                    Country
                                </label>
                                <ChevronDown size={18} aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-bark-500 pointer-events-none" />
                                {errors.country && <p className="text-xs font-body text-pumpkin-700 mt-1 ml-1">{errors.country.message}</p>}
                            </div>
                        </div>
                    </fieldset>
                    
                    {/* Submit button */}
                    <div className="flex flex-col gap-3 pt-2">
                        {hasSoldItems && (
                            <div className="flex flex-col items-center gap-2 text-center">
                                <p id="checkout-sold-notice" role="status" className="font-body text-sm font-semibold text-bark-900">
                                    Some pieces in your order have already found a home.
                                </p>
                                <Button type="button" variant="secondary" size="sm" onClick={removeSoldItems}>
                                    Remove sold pieces
                                </Button>
                            </div>
                        )}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting || hasSoldItems}
                            aria-describedby={hasSoldItems ? "checkout-sold-notice" : undefined}
                            className="w-full"
                        >
                            {isSubmitting ? "Placing order..." : `Place order · ${formatLei(total)}`}
                        </Button>
                        <p className="font-body text-sm text-bark-700 text-center">
                            No payment is taken on this site yet.
                        </p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CheckoutPage
