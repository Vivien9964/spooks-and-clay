
import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"
import ProductCard from "@/features/products/ProductCard"
import { products } from "@/data/products"

const featured = products.filter((product) => product.isFeatured === true)
const browseCategories = [
    { slug: "figurines",          label: "Figurines", image: "/categories/figurines.png", tagline: "The ghosts live here",       bg: "bg-cream-300",   textColor: "text-bark-900",    subtextColor: "text-bark-700",    dividerColor: "bg-bark-300" },
    { slug: "accessories",        label: "Accessories", image: "/categories/accessories.png", tagline: "Wear a little weird",         bg: "bg-plum-300",    textColor: "text-plum-900",    subtextColor: "text-plum-700",    dividerColor: "bg-plum-500" },
    { slug: "seasonalCollections",label: "Collections", image: "/categories/collections.png",   tagline: "The whole haunted family",    bg: "bg-sage-300",    textColor: "text-sage-900",    subtextColor: "text-sage-700",    dividerColor: "bg-sage-500" },
    { slug: "uniquePieces",       label: "One of a Kind", image: "/categories/oneOfaKind.png", tagline: "Catch it before it vanishes",  bg: "bg-pumpkin-300", textColor: "text-bark-900",    subtextColor: "text-pumpkin-900", dividerColor: "bg-pumpkin-700", rare: true },
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
                            Every shelf deserves some <span className="text-plum-500 italic">whimsical</span>.
                        </p>
                    </div>

                    <div className="flex items-end justify-center gap-4 md:gap-6 w-full max-w-2xl">
                        <div className="w-1/4 -rotate-2 animate-float shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm">
                                <img src="/products/witch-pin.jpg" alt="Witch Hat Pin" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                        <div className="w-2/5 animate-float rotate-1 shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm">
                                <img src="/products/pumpkin-1.jpg" alt="Pumpkin Patch Figurine" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                        <div className="w-1/4 -rotate-1 animate-float shrink-0">
                            <div className="bg-cream-50 p-2 border-2 border-bark-900 rounded-sm">
                                <img src="/products/ghost-1.jpg" alt="Friendly Ghost Figurine" className="w-full aspect-square object-cover" />
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

            <section className="w-full bg-cream-100 py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

                        <div className="flex justify-center">
                            <div className="-rotate-2 bg-cream-50 p-3 border-2 border-bark-900 shadow-[6px_6px_0px_var(--color-bark-900)] w-full max-w-sm">
                                <img
                                    src="/products/collection.jpg"
                                    alt="Ghost duo figurine - two clay ghosts on a moss and bark base"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h2 className="font-display text-4xl md:text-5xl text-bark-900 leading-tight">
                                They've been here<br />since <span className="text-plum-500 italic">October.</span>
                            </h2>
                            <p className="font-body text-base text-bark-500 leading-relaxed">
                                The little one won't let go of that pumpkin. The tall one is keeping watch. Neither is going anywhere - and honestly, that feels right.
                            </p>
                            <p className="font-body text-sm text-bark-300 italic">
                                Sculpted by hand, one at a time. No moulds. No shortcuts.
                            </p>
                            <div className="pt-2">
                                <Link to="/product/haunted-family-set">
                                    <Button variant="primary">Meet the ghosts</Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

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
                                to={`/shop?category=${category.slug}`}
                                aria-label={`Browse ${category.label}`}
                                className={`group flex flex-col ${category.bg} border-2 border-bark-900 rounded-sm p-2 shadow-[4px_4px_0px_var(--color-bark-900)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-bark-900)] transition-all duration-200`}
                            >
                                <div className="relative overflow-hidden bg-cream-50 border border-bark-300">
                                    <img
                                        src={category.image}
                                        alt={category.label}
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
                                        <span className={`flex-1 h-px ${category.dividerColor} opacity-50`} />
                                        <span className={`${category.textColor} text-xs opacity-60`}>✦</span>
                                        <span className={`flex-1 h-px ${category.dividerColor} opacity-50`} />
                                    </div>
                                    <span className={`font-display text-base ${category.textColor} text-center leading-tight`}>{category.label}</span>
                                    <span className={`font-body text-xs ${category.subtextColor} text-center`}>{category.tagline}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>

            <section className="w-full bg-bark-900 py-20">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8 text-center">

                    <div className="flex items-center gap-3 w-40">
                        <span className="flex-1 h-px bg-bark-500" />
                        <span className="text-pumpkin-300 text-sm select-none">✦</span>
                        <span className="flex-1 h-px bg-bark-500" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="font-display text-4xl md:text-6xl text-cream-50 leading-tight">
                            One of a Kind.<br />
                            <span className="text-pumpkin-500">Gone when it's gone.</span>
                        </h2>
                        <p className="font-body text-base text-bark-300 max-w-md mx-auto leading-relaxed">
                            Some pieces are made once and never repeated. No mould. No second run. When it finds its home, that's the only one that ever existed.
                        </p>
                    </div>

                    <div className="-rotate-1 bg-cream-50 p-3 border-2 border-bark-700 shadow-[4px_4px_0px_var(--color-bark-700)] w-48">
                        <img
                            src="/products/moon-cat.jpg"
                            alt="Hand-Carved Moon Cat - one-of-a-kind clay sculpture"
                            className="w-full aspect-square object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-1 items-center">
                        <span className="font-display text-2xl text-pumpkin-300">The Potion Keeper</span>
                        <span className="font-body text-sm text-bark-300">Only 1 exists · $120.00</span>
                    </div>

                    <Link to="/product/the-potion-keeper">
                        <Button variant="primary">Claim this piece</Button>
                    </Link>

                </div>
            </section>

        </div>
    )
}

export default HomePage;