import { Link } from "react-router-dom"
import clsx from "clsx"
import { buttonClasses } from "@/components/ui/buttonStyles"

// Placeholder gallery for now
const pieces = [
    { src: "/redesignImages/tinyPumpkinGhostieFriends-1.jpeg", alt: "Tiny pumpkin and ghost friends, handmade clay miniature" },
    { src: "/redesignImages/witchyPumpkin-2.jpeg", alt: "Witchy pumpkin, handmade clay miniature" },
    { src: "/redesignImages/pumpkinsTrip-1.jpeg", alt: "Two clay pumpkins on a little trip" },
    { src: "/redesignImages/surprisedGhostieWithPumpkin-3.jpeg", alt: "Surprised ghost with a pumpkin, handmade clay miniature" },
    { src: "/redesignImages/ghostiesWithPumpkin-1.jpeg", alt: "Two clay ghosts and a pumpkin on a moss nest, held in a hand in the mountains" },
    { src: "/redesignImages/tinyPumpkins.jpeg", alt: "A group of tiny clay pumpkins" },
]

const blobs = ["blob-1", "blob-2", "blob-3"]

function PortfolioPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 flex flex-col gap-12">
            
            {/* Portfolio title + description */}
            <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
                <span className="font-body text-sm tracking-widest uppercase text-moss-700">Portfolio</span>
                <h1 className="font-display text-5xl md:text-7xl text-bark-900">Spooks I've made</h1>
                <p className="font-body text-lg text-bark-700">
                    A little gallery of past pieces. The stories behind each one are on their way.
                </p>
            </div>

            {/* Portfolio grid  */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {pieces.map((piece, index) => (
                    // Portfolio bubble with image
                    <div key={piece.src} className={clsx("overflow-hidden shadow-soft bg-cream-200", blobs[index % blobs.length])}>
                        <img src={piece.src} alt={piece.alt} loading="lazy" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                ))}
            </div>
            
            {/* Portfolio actions */}
            <div className="flex justify-center">
                <Link to="/shop" className={buttonClasses("primary", undefined, "lg")}>Find your little spook</Link>
            </div>

        </div>
    )
}

export default PortfolioPage
