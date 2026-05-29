
import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"
import ProductCard from "@/features/products/ProductCard"
import { products } from "@/data/products"

const featured = products.filter((product) => product.isFeatured === true)

function HomePage() {

return (
        <div className="flex flex-col gap-8 items-center">

            {/* Hero with image and description */}
            <section className="relative w-full bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">

                    <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start">
                        <span className="inline-flex items-center gap-1 text-sm font-body text-sage-700 bg-sage-100 px-3 py-1 rounded-full w-fit">
                            Small-batch · Handmade
                        </span>

                        <h1 className="font-display text-4xl md:text-6xl text-bark-900 leading-tight">
                            Handmade Spooks, straight from the Cauldron
                        </h1>

                        <p className="font-body text-lg text-bark-500 max-w-md">
                            Because life needs <span className="text-plum-500 italic">whimsical</span>.
                        </p>

                        <Link to="/shop">
                            <Button variant="primary" className="inline-flex items-center gap-2">
                                Shop now
                            </Button>
                        </Link>

                        <p className="text-sm text-bark-300">
                            Spooky and cute · Made to order
                        </p>
                    </div>

                    <div className="order-first md:order-last relative mx-auto w-full max-w-md">
                        <div className="absolute inset-0 -z-10 rounded-[40%_60%_60%_40%/50%_50%_50%_50%] bg-pumpkin-100 scale-110 blur-sm" />
                        <div className="relative aspect-square">

                            <div className="animate-float-lg absolute top-2 right-2 w-1/3 z-0">
                                <img
                                    src="https://placehold.co/400x400"
                                    alt="Witch Hat Pin"
                                    className="w-full rounded-xl object-cover -rotate-1 shadow-[0_4px_16px_rgba(42,24,16,0.10)]"
                                />
                            </div>

                            <div className="animate-float-md absolute bottom-4 right-4 w-5/12 z-10">
                                <img
                                    src="https://placehold.co/400x400"
                                    alt="Friendly Ghost Figurine"
                                    className="w-full rounded-xl object-cover rotate-3 shadow-[0_6px_24px_rgba(42,24,16,0.12)]"
                                />
                            </div>

                            <div className="animate-float absolute top-4 left-0 w-7/12 z-20">
                                <img
                                    src="https://placehold.co/400x400"
                                    alt="Pumpkin Patch Figurine"
                                    className="w-full rounded-2xl object-cover -rotate-2 shadow-[0_8px_30px_rgba(42,24,16,0.15)]"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full bg-cream-200 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">

                    <div className="flex flex-col items-center gap-3">
                        <h2 className="font-display text-3xl text-bark-900 text-center">Featured Products</h2>
                        <div className="flex items-center gap-3 w-40">
                            <span className="flex-1 h-px bg-cream-300" />
                            <span className="text-bark-300 text-sm">✦</span>
                            <span className="flex-1 h-px bg-cream-300" />
                        </div>
                    </div>

                    <div className="flex md:grid md:grid-cols-4 gap-6 w-full overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory scroll-smooth pb-2 md:pb-0">
                        {featured.map((featuredProduct) => (
                            <div key={featuredProduct.id} className="snap-start shrink-0 w-[75vw] sm:w-[45vw] md:w-auto">
                                <ProductCard product={featuredProduct} />
                            </div>
                        ))}
                    </div>

                    <Link to="/shop">
                        <Button variant="ghost">Browse all →</Button>
                    </Link>

                </div>
            </section>
            

        </div>
    )
}

export default HomePage;