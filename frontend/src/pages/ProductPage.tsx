
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { useProduct } from "@/hooks/useProduct"
import { useIsSlow } from "@/hooks/useIsSlow"

import { categoryLabels } from "@/data/categories" 
import { effectivePrice, formatLei } from "@/utils/price"

import Button from "@/components/ui/Button"
import { buttonClasses } from "@/components/ui/buttonStyles"
import Badge from "@/components/ui/Badge"
import SlowLoadNotice from "@/components/SlowLoadNotice"



function ProductPageContent({ slug }: { slug: string }) {

    // Get status info and data and refetch function from useProduct hook
    const { productData, loadingStatus, errorStatus, refetch } = useProduct(slug)
    // Get addItem function from CartStore
    const addItem = useCartStore((s) => s.addItem)
    const openCart = useUIStore((s) => s.openCart)
    // Keep track of which image to show, in case of multiple ones
    const [selectedImage, setSelectedImage] = useState(0)
    const isSlow = useIsSlow(loadingStatus === "loading")

    // Show a message while loading the page 
    if (loadingStatus === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <p className="font-body text-bark-500 italic">Summoning the creature…</p>
                {isSlow && <SlowLoadNotice />}
            </div>
        )
    }
    
    // Show error message or prompt users to load the page again
    // Handle  not found / server wake ups
    if (loadingStatus === "error" || !productData) {

        const notFound = errorStatus === 404

        return (
               <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
                    <h1 className="font-display text-4xl text-bark-900">
                        {notFound ? "This spook has wandered off!" : "We couldn't reach the spooks."}
                    </h1>
                    <p className="font-body text-sm text-bark-500 italic">
                        {notFound
                            ? "This creature isn't in our collection."
                            : "The shop runs on free hosting and may still be waking up."
                        }
                    </p>
                <div className="flex items-center gap-3">
                    {!notFound && <Button variant="primary" onClick={refetch}>Try again</Button>}
                    <Link to="/shop" className={buttonClasses("ghost")}>Back to Shop</Link>
                </div>
        </div>
        )
    }

    // If no loading error occours set product details for rendering
    const product = productData

    const price = effectivePrice(product)
    const categoryLabel = categoryLabels[product.category] ?? product.category

    // Add to cart function
    const handleAddToCart = () => {
        addItem(product)
        openCart()
    }

    return (
        <div className="bg-cream-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 font-body text-sm text-bark-500" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-bark-700 transition-colors">Home</Link>
                    <span aria-hidden="true">›</span>
                    <Link to="/shop" className="hover:text-bark-700 transition-colors">Shop</Link>
                    <span aria-hidden="true">›</span>
                    <Link to={`/shop?category=${product.category}`} className="hover:text-bark-700 transition-colors">{categoryLabel}</Link>
                    <span aria-hidden="true">›</span>
                    <span className="text-bark-900 truncate" aria-current="page">{product.name}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-10 items-start">

                    {/* Product images displayed in a row + currently selected */}
                    <div className="flex flex-col gap-3">
                        <div className="bg-cream-200 rounded-[2rem] overflow-hidden shadow-lift">
                            <img
                                src={product.images[selectedImage].src}
                                alt={product.images[selectedImage].alt}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        {/* Show image row in case multiple images are present - images are clickable, users select selectedImage with them */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        aria-label={`Show image ${index + 1}`}
                                        aria-pressed={index === selectedImage}
                                        className={`rounded-xl overflow-hidden ring-offset-2 ring-offset-cream-100 transition-all duration-200 cursor-pointer ${
                                            index === selectedImage
                                                ? "ring-2 ring-pumpkin-500 opacity-100"
                                                : "opacity-60 hover:opacity-90"
                                        }`}
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            className="w-16 h-16 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Metadata - name, category, description, price, variants etc. */}
                    <div className="flex flex-col gap-4">

                        <span className="font-body text-sm tracking-widest uppercase text-moss-700">{categoryLabel}</span>

                        <h1 className="font-display text-5xl md:text-6xl text-bark-900">{product.name}</h1>

                        <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="font-heading font-semibold text-3xl text-pumpkin-700">{formatLei(price)} Lei</span>
                            {product.isOnSale && (
                                <>
                                    <span className="font-body text-lg text-bark-500 line-through">{formatLei(product.basePrice)} Lei</span>
                                    <Badge variant="sale">{product.discountPercent}% off</Badge>
                                </>
                            )}
                        </div>

                        <p className="font-body text-lg text-bark-700 leading-relaxed">{product.shortDesc}</p>

                        {product.stockCount === 1 && (
                            <p className="font-body text-base text-lime-700 text-shadow-sm font-bold">In stock</p>
                        )}

                    
                        <Button variant="primary" size="lg" className="w-full" onClick={handleAddToCart}>
                            Add to cart
                        </Button>

                        <p className="font-body text-base text-bark-700 leading-relaxed pt-4 mt-2 border-t border-cream-300">{product.longDesc}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

// ProductPage renders ProductPageContent
function ProductPage() {

    const { slug } = useParams<{ slug: string }>()

    return <ProductPageContent key={slug} slug={slug ?? ""} />
}

export default ProductPage