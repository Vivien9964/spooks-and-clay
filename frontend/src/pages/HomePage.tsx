
import { Link } from "react-router-dom"
import clsx from "clsx"
import ProductCard from "@/features/products/ProductCard"
import ProductCardSkeleton from "@/features/products/ProductCardSkeleton"
import SlowLoadNotice from "@/components/SlowLoadNotice"
import ScallopDivider from "@/components/ui/ScallopDivider"
import FaqList from "@/components/FaqList"
import { buttonClasses } from "@/components/ui/buttonStyles"
import { useEffect, useState, type ReactNode } from "react"
import { getFeaturedProducts } from "@/services/products"
import { useIsSlow } from "@/hooks/useIsSlow"
import { faqItems } from "@/data/faq"
import { socials } from "@/data/socials"
import type { Product } from "@/types/product"

const heroFigurines = [
    { src: "/redesignImages/witchyPumpkin-1.jpeg", alt: "Witchy clay pumpkin", bubble: "Hi!", size: "w-[28%] max-w-60", float: "animate-float-md", shadow: "animate-shadow-md", blob: "blob-2", offset: "mb-6" },
    { src: "/redesignImages/surprisedGhostieWithPumpkin-2.jpeg", alt: "Surprised clay ghost with a pumpkin", bubble: "Boo!", size: "w-[36%] max-w-80", float: "animate-float", shadow: "animate-shadow", blob: "blob-1", offset: "mb-10" },
    { src: "/redesignImages/tinyPumpkins.jpeg", alt: "Tiny clay pumpkins", bubble: "Pick me!", size: "w-[28%] max-w-60", float: "animate-float-lg", shadow: "animate-shadow-lg", blob: "blob-3", offset: "mb-4" },
]

const iconProps = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true }

const makerFacts: { label: string, icon: ReactNode }[] = [
    { label: "Clay, dried flowers and tiny crystals", icon: (
        <svg {...iconProps}><path d="M8 22c-2-4 0-9 4-11 3-2 8-2 11 1 3 3 3 8 0 11-3 2-11 3-15-1z" /><path d="M13 15c1-1 3-1 4 0" /></svg>
    ) },
    { label: "Sculpted and painted by hand, no moulds", icon: (
        <svg {...iconProps}><path d="M10 17V9a2 2 0 0 1 4 0v6" /><path d="M14 14V7a2 2 0 0 1 4 0v7" /><path d="M18 14V9a2 2 0 0 1 4 0v8c0 5-3 9-8 9-3 0-5-1-7-4l-3-5a2 2 0 0 1 3-2l3 3" /></svg>
    ) },
    { label: "Packed with care", icon: (
        <svg {...iconProps}><path d="M5 11l11-5 11 5v11l-11 5-11-5z" /><path d="M5 11l11 5 11-5" /><path d="M16 16v11" /></svg>
    ) },
    { label: "One of a kind, truly only yours", icon: (
        <svg {...iconProps}><path d="M16 5l3 7 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z" /></svg>
    ) },
]

const autumnBubbles = [
    { title: "Small by design", text: "Sized for a shelf, a desk or a windowsill.", color: "bg-honey-300" },
    { title: "Perfectly imperfect", text: "Quirky smiles and wonky little bodies make each one truly yours.", color: "bg-pumpkin-300" },
    { title: "Made to make you smile", text: "Here to brighten your day, from day one.", color: "bg-cream-300" },
]

function HomePage() {


    const [featured, setFeatured] = useState<Product[]>([])
    const [isLoadingFeatured, setIsLoadingFeatured] = useState(true)
    const [activeBubble, setActiveBubble] = useState<number | null>(null)

    const isSlow = useIsSlow(isLoadingFeatured)

    useEffect(() => {
        let ignore = false

        getFeaturedProducts()
            .then((data) => { 
                if(!ignore) {
                    setFeatured(data)
                }
            })
            .catch(() => {
                if(!ignore) {
                    setFeatured([])
                }
            })
            .finally(() => {
                if(!ignore) {
                    setIsLoadingFeatured(false)
                }
            })

        return () =>  { 
            ignore = true 
        }

    }, [])

return (
        <div className="flex flex-col">

            {/* Hero */}
            <section className="w-full bg-cream-100 overflow-hidden">
                {/* Hero content */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-10 md:py-16 grid md:grid-cols-2 gap-4 md:gap-x-8 items-center">
                    
                    {/* Hero title */}
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h1 className="font-display text-[clamp(1.75rem,10.5vw,3.75rem)] md:text-[clamp(2.5rem,5.2vw,4.25rem)] text-bark-900">
                            Little creatures, <br/> <span className="text-pumpkin-700">big personalities.</span>
                        </h1>
                        <p className="font-heading text-xl md:text-2xl text-bark-700">
                            Handmade clay ghosts, pumpkins & woodland friends.
                        </p>
                    </div>

                    {/* Hero bubbles container */}
                    <div className="relative flex items-end justify-center h-[35vh] min-h-56 md:h-[26rem] lg:h-[32rem] md:row-span-2 md:col-start-2 md:row-start-1">
                        {/* Hero bubbles */}
                        <div className="relative w-full max-w-md md:max-w-none flex items-end justify-center gap-2 sm:gap-4 pb-6">
                            {heroFigurines.map((figurine, index) => (
                                <div key={figurine.src} className={clsx("flex flex-col items-center", figurine.size, figurine.offset)}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveBubble(activeBubble === index ? null : index)}
                                        onBlur={() => setActiveBubble(null)}
                                        aria-label={`${figurine.alt} says ${figurine.bubble}`}
                                        className={clsx("group relative w-full cursor-pointer focus-visible:outline-none", figurine.float)}
                                    >   
                                        {/* Hero bubble message */}
                                        <span
                                            aria-hidden="true"
                                            className={clsx(
                                                "absolute -top-9 lg:-top-11 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 lg:px-4 lg:py-1.5 lg:text-lg rounded-full bg-cream-50 shadow-soft font-heading font-bold text-bark-900 transition-all duration-200",
                                                "after:absolute after:left-1/2 after:-bottom-1.5 after:-translate-x-1/2 after:border-x-6 after:border-t-6 after:border-x-transparent after:border-t-cream-50",
                                                activeBubble === index
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
                                            )}
                                        >
                                            {figurine.bubble}
                                        </span>

                                        {/* Hero bubble image */}
                                        <img
                                            src={figurine.src}
                                            alt=""
                                            className={clsx("w-full aspect-square object-cover shadow-soft ring-4 ring-cream-50 group-focus-visible:ring-pumpkin-700", figurine.blob)}
                                        />
                                    </button>
                                    <span aria-hidden="true" className={clsx("mt-2 h-3 w-2/3 rounded-[50%] bg-bark-900/40 blur-[2px]", figurine.shadow)} />
                                </div>
                            ))}

                        </div>
                    </div>
                    
                    {/* Hero actions */}
                    <div className="flex flex-col gap-5 items-center md:items-start">
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
                            <Link to="/shop" className={buttonClasses("primary", "w-full sm:w-auto", "lg")}>
                                Get a Friend
                            </Link>
                            <a href="#what-i-make" className="font-body font-bold text-bark-900 underline decoration-wavy decoration-pumpkin-500 decoration-2 underline-offset-[6px] hover:text-pumpkin-700">
                                Meet the maker
                            </a>
                        </div>
                       
                    </div>

                </div>
            </section>

            {/* Section divider */}
            <ScallopDivider colorClass="text-cream-200" className="bg-cream-100" />

            {/* What I make */}
            <section id="what-i-make" className="w-full bg-cream-200 py-14 md:py-20 scroll-mt-20">

                {/* What I make container */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    
                    {/* What I make image */}
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md">
                            <div aria-hidden="true" className="absolute -inset-2 md:-inset-4 bg-pumpkin-300/50 blob-3 -rotate-6" />
                            <img
                                src="/redesignImages/ghostiesWithPumpkin-1.jpeg"
                                alt="Two clay ghosts and a little pumpkin on a moss nest, held in a hand in the mountains"
                                loading="lazy"
                                className="relative w-full aspect-square object-cover blob-1 shadow-lift"
                            />
                        </div>
                    </div>
                        
                    {/* What I make title + description */}
                    <div className="flex flex-col gap-5">
                        <h2 className="font-display text-5xl md:text-6xl text-bark-900">Goofy, tiny, only yours!</h2>
                        <div className="flex flex-col gap-3 font-body text-lg text-bark-700 leading-relaxed">
                            <p>Hi, I'm Vivien, the hands (and daydreams) behind Spooks & Clay.</p>
                            <p>I make small things for people who still find a little magic in fallen leaves, freshly brewed coffee or a crisp autumn night.</p>
                            <p>Every miniature starts with a vintage playlist, a lump of clay and a wish to bring back the purest kind of childhood happiness.</p>
                            <p>Every spook is sculpted and painted by hand, without moulds.</p>
                            <p>No two are alike, so yours is truly only yours.</p>
                        </div>

                        {/* Maker facts list */}
                        <ul className="grid sm:grid-cols-2 gap-3 pt-1">
                            {makerFacts.map((fact) => (
                                <li key={fact.label} className="flex items-center gap-3 bg-cream-50 rounded-2xl px-4 py-3 shadow-soft">
                                    <span className="shrink-0 text-pumpkin-700">{fact.icon}</span>
                                    <span className="font-body text-sm font-medium text-bark-900">{fact.label}</span>
                                </li>
                            ))}
                        </ul>

                        {/* What I make action */}
                        <div className="pt-2 mx-auto">
                            <Link to="/shop" className={buttonClasses("primary")}>Find your little spook</Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Featured products */}
            <section className="w-full bg-cream-100 py-14 md:py-20">

                {/* Featured container */}
                <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-10">
                    
                    {/* Featured title */}
                    <h2 className="font-display text-center text-5xl md:text-6xl text-bark-900">From the Cauldron</h2>
                    
                    {isSlow && <SlowLoadNotice className="w-full max-w-xl" />}

                    {/* 2-col grid on mobile (not a horizontal scroller) so it doesn't fight the in-card image swipe */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                        {isLoadingFeatured
                            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
                            : featured.map((featuredProduct) => (
                                <ProductCard key={featuredProduct.id} product={featuredProduct} />
                            ))}
                    </div>
                    
                    {/* Featured action */}
                    <Link to="/shop" className={buttonClasses("primary", undefined, "lg")}>
                        See all the spooks
                    </Link>

                </div>
            </section>

            {/* Section divider */}
            <ScallopDivider colorClass="text-moss-700" className="bg-cream-100" />

            {/* Forever autumn */}
            <section className="w-full bg-moss-700 py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    
                    {/* Forever autumn title + description */}
                    <div className="flex flex-col gap-5 md:order-1 order-2">
                        <h2 className="font-display text-5xl md:text-6xl text-cream-50">Forever autumn, right here.</h2>
                        <p className="font-body text-lg text-cream-100 leading-relaxed">
                            At Spooks & Clay the air is always crisp, 
                            the pumpkins and ghosts are a little goofy, 
                            and there's always room for one more adventure.<br/>
                            A little corner of autumn, open all year.

                        </p>

                        {/* Forever autumn action */}
                        <div className="pt-1 mx-auto">
                            <Link to="/shop" className={buttonClasses("primary")}>Meet the spooks</Link>
                        </div>
                    </div>
                    
                    {/* Forever autumn image */}
                    <div className="relative md:order-2 order-1">
                        <img
                            src="/redesignImages/pimpkinWithSign-2.jpeg"
                            alt="A toothy clay pumpkin on a mossy base next to a tiny Beware Spooky sign, among autumn leaves"
                            loading="lazy"
                            className="w-full aspect-[4/3] object-cover rounded-[2.5rem] shadow-lift"
                        />
                    </div>
                    
                    {/* Forever autumn fact bubbles */}
                    <ul className="md:col-span-2 order-3 grid sm:grid-cols-3 gap-4">
                        {autumnBubbles.map((bubble, index) => (
                            <li
                                key={bubble.title}
                                className={clsx(
                                    "flex flex-col gap-1 rounded-[2rem] px-6 py-5 shadow-soft",
                                    bubble.color,
                                    index === 1 ? "sm:-translate-y-3 rotate-1" : "-rotate-1"
                                )}
                            >
                                <span className="font-heading text-lg font-bold text-bark-900">{bubble.title}</span>
                                <span className="font-body text-base text-bark-900">{bubble.text}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </section>

            {/* Section divider */}
            <ScallopDivider colorClass="text-moss-700" flip className="bg-cream-200" />

            {/* Gift */}
            <section className="w-full bg-cream-200 py-14 md:py-20">

                {/* Gift container */}
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-[2fr_3fr] gap-10 items-center">
                    
                    {/* Gift image */}
                    <div className="relative flex justify-center">
                        <div aria-hidden="true" className="absolute inset-6 bg-honey-300 blob-2 rotate-6" />
                        <img
                            src="/redesignImages/surprisedGhostieWithPumpkin-3.jpeg"
                            alt="A surprised clay ghost with a little pumpkin"
                            loading="lazy"
                            className="relative w-full max-w-xs aspect-square object-cover blob-1 shadow-lift"
                        />
                    </div>
                    
                    {/* Gift title + description */}
                    <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start">
                        <h2 className="font-display text-5xl md:text-6xl text-bark-900">A tiny way to say <br/> "I thought of you!"</h2>
                        <p className="font-body text-lg text-bark-700 leading-relaxed max-w-lg">
                            For the autumn soul, the woodland wanderer, or someone who could use a little joy on their shelf.
                        </p>

                        {/* Gift action */}
                        <Link to="/shop" className={buttonClasses("primary")}>Find a little gift</Link>
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="w-full bg-cream-100 py-14 md:py-20">
                {/* FAQ container */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1fr_2fr] gap-10">
                    
                    {/* FAQ title + contact */}
                    <div className="flex flex-col gap-4">
                        <h2 className="font-display text-5xl md:text-6xl text-bark-900">Good to know</h2>
                        <p className="font-body text-lg text-bark-700">
                            Wondering about something else? The creator is ready to answer.
                        </p>
                        <div>
                            <a href={socials.email.href} className={buttonClasses("secondary")}>Say hello</a>
                        </div>
                    </div>
                    
                    {/* FAQ accordion */}
                    <FaqList items={faqItems} />

                </div>
            </section>

            {/* Follow for more */}
            <section className="w-full bg-cream-100 pb-16 md:pb-24 px-4">
                {/* Follow for more container with title + description */}
                <div className="max-w-4xl mx-auto bg-pumpkin-300 rounded-[2.5rem] px-6 py-12 md:py-14 flex flex-col items-center gap-5 text-center shadow-soft">
                    <h2 className="font-display text-5xl md:text-6xl text-bark-900">Follow for new drops</h2>
                    <p className="font-body text-lg text-bark-900 max-w-lg">
                        New spooks wake up every few weeks. Follow along so you don't miss them.
                    </p>

                    {/* Follow for more socials */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href={socials.instagram.href} className={buttonClasses("light")}>{socials.instagram.label}</a>
                        <a href={socials.email.href} className={buttonClasses("secondary")}>Ask about a custom scene</a>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default HomePage;
