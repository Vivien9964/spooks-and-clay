import { NavLink } from "react-router-dom"
import ScallopDivider from "@/components/ui/ScallopDivider"
import { socials } from "@/data/socials"

const footerLinkStyle = "font-body text-sm text-cream-200 hover:text-honey-300 transition-colors duration-200"

function Footer() {
    return(
        <footer className="w-full">

            <ScallopDivider colorClass="text-bark-900" />

            <div className="bg-bark-900">
                <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3 text-center md:text-left">

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <NavLink to="/">
                            <span className="font-display text-4xl text-cream-50">
                                Spooks <span className="text-pumpkin-500">&</span> Clay
                            </span>
                        </NavLink>
                        <p className="font-heading text-base text-cream-200 italic">Little creatures, big personalities.</p>
                    </div>

                    <nav aria-label="Footer" className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-heading text-sm font-semibold text-honey-300 mb-1">Explore</span>
                        <NavLink to="/" end className={footerLinkStyle}>Home</NavLink>
                        <NavLink to="/shop" className={footerLinkStyle}>Shop</NavLink>
                        <NavLink to="/portfolio" className={footerLinkStyle}>Portfolio</NavLink>
                    </nav>

                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-heading text-sm font-semibold text-honey-300 mb-1">Say hello</span>
                        {Object.values(socials).map((social) => (
                            <a key={social.label} href={social.href} className={footerLinkStyle}>{social.label}</a>
                        ))}
                    </div>

                </div>

                <p className="font-body text-xs text-bark-300 text-center pb-8 px-6">
                    &copy; {new Date().getFullYear()} Spooks &amp; Clay.
                </p>
            </div>

        </footer>
    )
}

export default Footer;
