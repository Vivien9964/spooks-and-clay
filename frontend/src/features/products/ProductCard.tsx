
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
            flex flex-col h-full overflow-hidden group
            rounded-2xl bg-cream-50 border border-cream-300 shadow-sm
            hover:-translate-y-1 hover:shadow-md transition-all duration-200
            "
        >

            <div className="relative aspect-square w-full overflow-hidden bg-cream-100">
                {product.isOnSale && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="positive">{product.discountPercent}%</Badge>
                    </div>
                )}
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="font-display text-lg text-bark-900 leading-snug">{product.name}</h2>
                <p className="font-body text-sm text-bark-500 line-clamp-2">{product.shortDesc}</p>

                <div className="flex items-baseline gap-2 mt-auto">
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