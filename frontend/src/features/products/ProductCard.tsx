

import type { Product } from "@/types/product"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import ImageSwiper from "@/features/products/ImageSwiper"

import { Link } from "react-router-dom"
import { toast } from "sonner"
import { categoryLabels } from "@/data/categories"

import { useCartStore } from "@/store/cartStore"
import { effectivePrice, formatLei } from "@/utils/price"



interface ProductCardProps {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {

    // Get addItem function from CartStore
    const addItem = useCartStore((s) => s.addItem)
    const isInCart = useCartStore((s) => s.items.some((i) => i.product.id === product.id))

    const productPrice = effectivePrice(product)
    const categoryLabel = categoryLabels[product.category] ?? product.category
    // Extracted product URL for fast navigaton 
    const productUrl = `/product/${product.slug}`

    // Add product to cart and show success toast
    const handleAddToCart = () => {
        if (isInCart) {
            toast(`${product.name} is already in your cart`)
            return
        }
        addItem(product);
        toast.success(`${product.name} added to cart!`);
    }

    return(
        <article className="relative flex flex-col h-full group overflow-hidden bg-cream-50 rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300">

            {/* Image itself is a streched link - users can navigate straight to the product */}
            <Link to={productUrl} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-cream-200">
                {product.isOnSale && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="sale">{product.discountPercent}% off</Badge>
                    </div>
                )}
                
                {/* Show ImageSwiper when product contains multiple images / default to only the first one */}
                {product.images.length > 0 ? (
                    <ImageSwiper images={product.images} />
                ) : (
                    // Show a message when images are not present
                    <div className="w-full aspect-square flex items-center justify-center text-bark-500 text-sm italic">
                        No image yet!
                    </div>
                )}
            </Link>
            
            {/* Product card body with details and price*/}
            <div className="relative flex flex-col flex-1 gap-1.5 p-4">

                <span className="font-body text-xs tracking-wider uppercase text-bark-500">{categoryLabel}</span>

                <h2 className="font-heading text-lg font-semibold text-bark-900 leading-snug">
                    {/* Stretched link for fast navigation */}
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
