

import type { Product } from "@/types/product"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

import { useState, type UIEvent } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import clsx from "clsx"
import { categoryLabels } from "@/data/categories"

import { useCartStore } from "@/store/cartStore"
import { effectivePrice, formatLei } from "@/utils/price"



interface ProductCardProps {
    product: Product
    // Turn off the in-card swipe when the card itself sits inside a horizontal scroller
    swipeable?: boolean
}

function ProductCard({ product, swipeable = true }: ProductCardProps) {

    const addItem = useCartStore((s) => s.addItem)
    const [activeImage, setActiveImage] = useState(0)

    const productPrice = effectivePrice(product)
    const categoryLabel = categoryLabels[product.category] ?? product.category
    const productUrl = `/product/${product.slug}`
    const images = swipeable ? product.images : product.images.slice(0, 1)
    const hasCarousel = images.length > 1

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product.name} added to cart!`);
    }

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        setActiveImage(Math.round(el.scrollLeft / el.clientWidth))
    }

    return(
        <article className="relative flex flex-col h-full group overflow-hidden bg-cream-50 rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300">

            {/* Image area has its own link (hidden from tab order) so swiping still works on touch */}
            <Link to={productUrl} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-cream-200">
                {product.isOnSale && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="sale">{product.discountPercent}% off</Badge>
                    </div>
                )}

                {images.length > 0 ? (
                    <div
                        onScroll={hasCarousel ? handleScroll : undefined}
                        className={clsx(
                            "flex aspect-square",
                            hasCarousel && "overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:overflow-hidden"
                        )}
                    >
                        {images.map((image, index) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={index === 0 ? image.alt : ""}
                                loading="lazy"
                                className="w-full h-full shrink-0 snap-center object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full aspect-square flex items-center justify-center text-bark-500 text-sm italic">
                        No image yet!
                    </div>
                )}

                {hasCarousel && (
                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 lg:hidden">
                        {images.map((image, index) => (
                            <span
                                key={image.src}
                                className={clsx(
                                    "h-1.5 rounded-full transition-all duration-200",
                                    index === activeImage ? "w-4 bg-cream-50" : "w-1.5 bg-cream-50/60"
                                )}
                            />
                        ))}
                    </div>
                )}
            </Link>

            <div className="relative flex flex-col flex-1 gap-1.5 p-4">

                <span className="font-body text-xs tracking-wider uppercase text-bark-500">{categoryLabel}</span>

                <h2 className="font-heading text-lg font-semibold text-bark-900 leading-snug">
                    {/* "Stretched link": the ::after overlay makes the whole text area clickable */}
                    <Link to={productUrl} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-pumpkin-700 focus-visible:after:rounded-b-2xl">
                        {product.name}
                    </Link>
                </h2>
                <p className="font-body text-sm text-bark-700 line-clamp-2">{product.shortDesc}</p>

                <div className="flex items-baseline gap-2 mt-auto pt-2">
                    <span className="font-heading text-xl font-bold text-pumpkin-700">{formatLei(productPrice)}</span>
                    {product.isOnSale && (
                        <span className="text-sm text-bark-500 line-through">{formatLei(product.basePrice)}</span>
                    )}
                </div>

                <Button
                    variant="primary"
                    className="relative z-10 w-full mt-2"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </Button>

            </div>

        </article>
    )
}

export default ProductCard;
