
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { products } from "@/data/products"
import { useCart } from "@/features/cart/CartContext"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"

const categoryLabels: Record<string, string> = {
    figurines: "Figurines",
    accessories: "Accessories",
    seasonalCollections: "Collections",
    uniquePieces: "One of a Kind",
}

function ProductPage() {

    const { slug } = useParams<{ slug: string }>()
    const { addItem, openCart } = useCart()
    const [selectedImage, setSelectedImage] = useState(0)

    const product = products.find((product) => product.slug === slug)

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h1 className="font-display text-4xl text-bark-900">Product not found</h1>
                <Link to="/shop"><Button variant="ghost">Back to Shop</Button></Link>
            </div>
        )
    }

    const price = product.isOnSale ? product.basePrice * (1 - product.discountPercent / 100) : product.basePrice
    const categoryLabel = categoryLabels[product.category] ?? product.category

    const handleAddToCart = () => {
        addItem(product)
        openCart()
    }

    return (
        <div className="bg-cream-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">

                <nav className="flex items-center gap-2 font-body text-sm text-bark-300">
                    <Link to="/" className="hover:text-bark-500 transition-colors">Home</Link>
                    <span>›</span>
                    <Link to="/shop" className="hover:text-bark-500 transition-colors">Shop</Link>
                    <span>›</span>
                    <span className="text-bark-500">{categoryLabel}</span>
                    <span>›</span>
                    <span className="text-bark-700 truncate">{product.name}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-10 items-start">

                    <div className="flex flex-col gap-3">
                        <div className="bg-cream-50 p-3 border-2 border-bark-900 rounded-sm shadow-[6px_6px_0px_var(--color-bark-900)]">
                            <img
                                src={product.images[selectedImage].src}
                                alt={product.images[selectedImage].alt}
                                className="w-full aspect-square object-cover"
                            />
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`bg-cream-50 p-1.5 rounded-sm border-2 overflow-hidden transition-all duration-200 ${
                                            index === selectedImage
                                                ? "border-bark-900 opacity-100 shadow-[3px_3px_0px_var(--color-bark-900)]"
                                                : "border-bark-300 opacity-60 hover:opacity-90 hover:border-bark-500"
                                        }`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">

                        <div className="flex items-center gap-3">
                            <span className="flex-1 h-px bg-bark-300" />
                            <span className="font-body text-xs tracking-[0.2em] uppercase text-bark-500">✦ {categoryLabel} ✦</span>
                            <span className="flex-1 h-px bg-bark-300" />
                        </div>

                        <h1 className="font-display text-4xl text-bark-900 leading-tight">{product.name}</h1>

                        <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="font-display text-3xl text-pumpkin-700">${price.toFixed(2)}</span>
                            {product.isOnSale && (
                                <>
                                    <span className="font-body text-lg text-bark-300 line-through">${product.basePrice.toFixed(2)}</span>
                                    <Badge variant="positive">{product.discountPercent}% off</Badge>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="flex-1 h-px bg-bark-300" />
                            <span className="text-bark-300 text-xs">✦</span>
                            <span className="flex-1 h-px bg-bark-300" />
                        </div>

                        <p className="font-body text-base text-bark-500 leading-relaxed">{product.shortDesc}</p>

                        {product.stockCount === 1 ? (
                            <p className="font-body text-sm text-plum-500 font-semibold">✦ One of a Kind — only one exists</p>
                        ) : product.stockCount < 10 ? (
                            <p className="font-body text-sm text-pumpkin-700 font-semibold">Only {product.stockCount} left!</p>
                        ) : (
                            <p className="font-body text-sm text-sage-700">✦ In stock</p>
                        )}

                        {product.variants && product.variants[0]?.sizes?.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <span className="font-body text-xs uppercase tracking-widest text-bark-300">Size</span>
                                <div className="flex gap-2">
                                    {product.variants[0].sizes.map((size) => (
                                        <button
                                            key={size}
                                            className="font-body text-sm capitalize border-2 border-bark-900 px-3 py-1 rounded-sm bg-cream-50 hover:bg-pumpkin-100 transition-colors duration-200"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button variant="primary" className="w-full" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>

                        <div className="flex items-center gap-2">
                            <span className="flex-1 h-px bg-bark-300" />
                            <span className="text-bark-300 text-xs">✦</span>
                            <span className="flex-1 h-px bg-bark-300" />
                        </div>

                        <p className="font-body text-sm text-bark-500 leading-relaxed">{product.longDesc}</p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-body text-xs text-bark-500 bg-cream-200 border border-cream-300 px-2 py-0.5 rounded-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage