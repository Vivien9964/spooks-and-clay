
import type { Product } from "@/types/product"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

import { Link } from "react-router-dom"
import { useCart } from "@/features/cart/CartContext"

const categoryLabels: Record<string, string> = {
    figurines: "Figurines",
    accessories: "Accessories",
    seasonalCollections: "Collections",
    uniquePieces: "One of a Kind",
}

interface ProductCardProps {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {

    const { addItem } = useCart()
    const productPrice = product.isOnSale ? product.basePrice * (1 - product.discountPercent / 100) : product.basePrice
    const categoryLabel = categoryLabels[product.category] ?? product.category

    return(
        <div className="flex flex-col h-full group overflow-hidden bg-cream-50 border-2 border-bark-900 rounded-sm shadow-[3px_3px_0px_var(--color-bark-900)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--color-bark-900)] transition-all duration-200">

            <div className="relative overflow-hidden border-b-2 border-bark-900">
                {product.isOnSale && (
                    <div className="absolute top-2 left-2 z-10">
                        <Badge variant="positive">{product.discountPercent}% off</Badge>
                    </div>
                )}
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            <div className="flex flex-col flex-1 gap-2 p-4">

                <div className="flex items-center gap-2">
                    <span className="flex-1 h-px bg-bark-300" />
                    <span className="font-body text-xs tracking-widest uppercase text-bark-300">{categoryLabel}</span>
                    <span className="flex-1 h-px bg-bark-300" />
                </div>

                <h2 className="font-display text-lg text-bark-900 leading-snug">{product.name}</h2>
                <p className="font-body text-xs text-bark-500 line-clamp-2">{product.shortDesc}</p>

                {product.stockCount < 10 && (
                    <p className="font-body text-xs text-pumpkin-700 font-semibold">Only {product.stockCount} left</p>
                )}

                <div className="flex items-baseline gap-2 mt-auto pt-1">
                    <span className="font-display text-xl text-pumpkin-700">${productPrice.toFixed(2)}</span>
                    {product.isOnSale && (
                        <span className="text-sm text-bark-300 line-through">${product.basePrice.toFixed(2)}</span>
                    )}
                </div>

                <div className="flex gap-2 pt-1">
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => addItem(product)}
                    >
                        Add to Cart
                    </Button>
                    <Link to={`/product/${product.slug}`}>
                        <Button variant="ghost">View</Button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default ProductCard;