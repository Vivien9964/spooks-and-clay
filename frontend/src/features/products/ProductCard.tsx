
import type { Product } from "@/types/product"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

import { Link } from "react-router-dom"

interface ProductCardProps {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {

    const productPrice = product.isOnSale ? product.basePrice * (1 - product.discountPercent / 100) : product.basePrice


    return(
        <div className="
            flex flex-col h-full group
            bg-cream-100 border-2 border-bark-900 rounded-sm p-2
            shadow-[4px_4px_0px_var(--color-bark-900)]
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-bark-900)]
            transition-all duration-200
            "
        >

            <div className="relative overflow-hidden border border-bark-300">
                {product.isOnSale && (
                    <div className="absolute top-2 left-2 z-10">
                        <Badge variant="positive">{product.discountPercent}%</Badge>
                    </div>
                )}
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            <div className="flex flex-col flex-1 gap-2 pt-3 pb-1 px-1">

                <div className="flex items-center gap-2">
                    <span className="flex-1 h-px bg-bark-300" />
                    <span className="text-bark-300 text-xs">✦</span>
                    <span className="flex-1 h-px bg-bark-300" />
                </div>

                <h2 className="font-display text-lg text-bark-900 leading-snug">{product.name}</h2>
                <p className="font-body text-xs text-bark-500 line-clamp-2">{product.shortDesc}</p>

                <div className="flex items-baseline gap-2 mt-auto pt-1">
                    <span className="font-display text-xl text-pumpkin-700">${productPrice.toFixed(2)}</span>
                    {product.isOnSale && (
                        <span className="text-sm text-bark-300 line-through">${product.basePrice.toFixed(2)}</span>
                    )}
                </div>

                <Link to={`/product/${product.slug}`} className="block mt-2">
                    <Button variant="primary" className="w-full">View</Button>
                </Link>

            </div>

        </div>
    )
}

export default ProductCard;