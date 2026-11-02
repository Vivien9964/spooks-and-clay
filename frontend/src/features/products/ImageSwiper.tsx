
import { useState, type UIEvent } from "react"
import clsx from "clsx"

import type { ProductImage } from "@/types/product"



interface ImageSwiperProps {
    images: ProductImage[]
}

function ImageSwiper({ images }: ImageSwiperProps) {

    const [activeImage, setActiveImage] = useState(0)
    const hasCarousel = images.length > 1

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        setActiveImage(Math.round(element.scrollLeft / element.clientWidth))
    }

    return (
        <>
            {/* Image track, swipeable when there are more images */}
            <div
                onScroll={hasCarousel ? handleScroll : undefined}
                className={clsx(
                    "flex aspect-square",
                    hasCarousel && "overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:overflow-hidden"
                )}
            >
                {images.map((image, index) => (
                    // Protect current image when grows - next image is not spilling into the current image on hover
                    <div key={image.src} className="w-full h-full shrink-0 snap-center overflow-hidden">
                        <img
                            src={image.src}
                            alt={index === 0 ? image.alt : ""}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </div>
                ))}
            </div>

            {/* Dots rendered only for images with a carousel */}
            {hasCarousel && (
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 lg:hidden">
                    {images.map((image, index) => (
                        <span
                            key={image.src}
                            className={clsx(
                                "h-1.5 rounded-full transition-all duration-200",
                                index === activeImage ? "w-4 bg-cream-50" : "w-1.5 bg-cream-50/60"
                            )}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default ImageSwiper;
