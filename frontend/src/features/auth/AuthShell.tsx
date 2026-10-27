import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { textLinkClasses } from "@/components/ui/buttonStyles"

// Wrapper component to achieve the two column look for both Login and Register pages

type AuthShellProps = {
    title: string
    subtitle: string
    image: { src: string, bubble: string }
    children: ReactNode // LoginFrom, RegisterForm
    footer: { text: string, linkTo: string, linkLabel: string }
}

function AuthShell({ title, subtitle, image, children, footer }: AuthShellProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">

            {/* Two column grid : image + form  */}
            <div className="grid md:grid-cols-2 bg-cream-50 rounded-[2rem] shadow-soft overflow-hidden">
                
                {/* Image column with blob message */}
                <div aria-hidden="true" className="relative bg-honey-300 flex items-end md:items-center justify-center pt-12 pb-6 md:py-16 overflow-hidden">
                    {/* Decorative divs */}
                    <div className="absolute top-8 left-8 w-6 h-6 rounded-full bg-cream-50/70" />
                    <div className="absolute bottom-10 right-10 w-10 h-10 blob-3 bg-pumpkin-300/70" />
                    {/* Main image with decorative div */}
                    <div className="relative flex flex-col items-center">
                        {/* Decorative div */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-[140%] aspect-square bg-moss-300/40 blob-3 rotate-12" />
                        {/* Blob message */}
                        <div className="motion-safe:animate-float-md relative">
                            <span className="absolute -top-11 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-4 py-1.5 rounded-full bg-cream-50 shadow-soft font-heading font-bold text-bark-900 after:absolute after:left-1/2 after:-bottom-1.5 after:-translate-x-1/2 after:border-x-6 after:border-t-6 after:border-x-transparent after:border-t-cream-50">
                                {image.bubble}
                            </span>
                            <img
                                src={image.src}
                                alt=""
                                className="w-32 md:w-60 aspect-square object-cover blob-2 shadow-soft ring-4 ring-cream-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Login / Register form column with footer (shortcut to the opposite action) and title */}
                <div className="p-6 sm:p-10">
                    <h1 className="text-center font-heading font-semibold text-3xl text-bark-900">{title}</h1>
                    <p className="text-center font-body text-bark-700 mt-2">{subtitle}</p>

                    {children}

                    {/* Footer, signaling opposite action */}
                    <div className="mt-8 pt-6 border-t border-cream-200 text-center font-body text-bark-700">
                        {footer.text} <Link to={footer.linkTo} className={textLinkClasses}>{footer.linkLabel}</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthShell
