
import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"
import ProductCard from "@/features/products/ProductCard"
import { products } from "@/data/products"

const featured = products.filter((product) => product.isFeatured === true)
const browseCategories = [
    { slug: "figurines",          label: "Figurines",     tagline: "The ghosts live here" },
    { slug: "accessories",        label: "Accessories",   tagline: "Wear a little weird" },
    { slug: "seasonalCollections",label: "Collections",   tagline: "The whole haunted family" },
    { slug: "uniquePieces",       label: "One of a Kind", tagline: "Catch it before it vanishes", rare: true },
]
const trustItems = ["Handmade", "Tiny spooks", "Made with love", "No two alike", "Shipped with care"]

function HomePage() {

return (
        <div className="flex flex-col gap-8 items-center">

            <section className="w-full bg-cream-100 border-b-2 border-bark-900">
                <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 flex flex-col items-center gap-8 text-center">

                    <div className="flex items-center gap-3 w-full max-w-xs">
                        <span className="flex-1 h-px bg-bark-900/20" />
                        <span className="font-body text-xs tracking-[0.25em] uppercase text-bark-500">Spooks &amp; Clay</span>
                        <span className="flex-1 h-px bg-bark-900/20" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="font-display text-5xl md:text-7xl text-bark-900 leading-tight">
                            Small Creatures.<br />Spooky Vibes.
                        </h1>
                        <p className="font-body text-lg text-bark-500 max-w-sm mx-auto">
                            Every shelf deserves a <span className="text-plum-500 italic">tiny haunting</span>.
                        </p>
                    </div>

                    <div className="flex items-end justify-center gap-4 md:gap-6 w-full max-w-2xl">
                        <div className="w-1/4 -rotate-2 animate-float shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm shadow-[4px_4px_0px_var(--color-bark-900)]">
                                <img src="https://placehold.co/400x400" alt="Witch Hat Pin" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                        <div className="w-2/5 animate-float rotate-1 shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm shadow-[4px_4px_0px_var(--color-bark-900)]">
                                <img src="https://placehold.co/400x400" alt="Pumpkin Patch Figurine" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                        <div className="w-1/4 -rotate-1 animate-float shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm shadow-[4px_4px_0px_var(--color-bark-900)]">
                                <img src="https://placehold.co/400x400" alt="Friendly Ghost Figurine" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <Link to="/shop">
                            <Button variant="primary" className="inline-flex items-center gap-2">
                                Shop now
                            </Button>
                        </Link>
                        <p className="font-body text-sm text-bark-300">No two alike · Sculpted just for you</p>
                    </div>

                </div>
            </section>

            <div className="overflow-hidden w-full bg-pumpkin-500 py-2.5" aria-hidden="true">
                <div className="flex animate-marquee">
                    {[...trustItems, ...trustItems, ...trustItems].map((item, index) => (
                        <span key={index} className="flex items-center gap-8 px-4 whitespace-nowrap">
                            <span className="font-body text-sm font-semibold tracking-widest uppercase text-cream-50">{item}</span>
                            <span className="text-pumpkin-300 text-xs select-none">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            <section className="w-full bg-cream-200 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">

                    <div className="flex flex-col items-center gap-3">
                        <h2 className="font-display text-3xl text-bark-900 text-center">From the Cauldron</h2>
                        <div className="flex items-center gap-3 w-40">
                            <span className="flex-1 h-px bg-cream-300" />
                            <span className="text-bark-300 text-sm">✦</span>
                            <span className="flex-1 h-px bg-cream-300" />
                        </div>
                    </div>

                    <div className="flex md:grid md:grid-cols-3 gap-6 w-full overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory scroll-smooth scrollbar-hide pb-2 md:pb-0">
                        {featured.map((featuredProduct) => (
                            <div key={featuredProduct.id} className="snap-start shrink-0 w-[75vw] sm:w-[45vw] md:w-auto">
                                <ProductCard product={featuredProduct} />
                            </div>
                        ))}
                    </div>

                    <Link to="/shop">
                        <Button variant="ghost">Browse all</Button>
                    </Link>

                </div>
            </section>


            <section className="w-full bg-cream-100 py-16">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">

                    <div className="flex flex-col items-center gap-3">
                        <h2 className="font-display text-3xl text-bark-900 text-center">Browse the Hollow</h2>
                        <div className="flex items-center gap-3 w-40">
                            <span className="flex-1 h-px bg-cream-300" />
                            <span className="text-bark-300 text-sm">✦</span>
                            <span className="flex-1 h-px bg-cream-300" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {browseCategories.map((category, index) => (
                            <Link
                                key={index}
                                to="/shop"
                                aria-label={`Browse ${category.label}`}
                                className="group flex flex-col bg-pumpkin-100 border-2 border-bark-900 rounded-sm p-2 shadow-[4px_4px_0px_var(--color-bark-900)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-bark-900)] transition-all duration-200"
                            >
                                <div className="relative overflow-hidden border border-bark-300">
                                    <img
                                        src="https://placehold.co/400x400"
                                        alt=""
                                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    {category.rare && (
                                        <span className="absolute top-2 right-2 bg-plum-500 text-cream-50 font-body text-xs font-semibold px-1.5 py-0.5 rounded-sm">
                                            Rare
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-1 pt-2.5 pb-1.5 px-1">
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="flex-1 h-px bg-bark-300" />
                                        <span className="text-bark-300 text-xs">✦</span>
                                        <span className="flex-1 h-px bg-bark-300" />
                                    </div>
                                    <span className="font-display text-base text-bark-900 text-center leading-tight">{category.label}</span>
                                    <span className="font-body text-xs text-bark-500 text-center">{category.tagline}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
            

        </div>
    )
}

export default HomePage;