import { NavLink } from "react-router-dom"

function Footer() {
    return(
        <footer className="w-full bg-bark-900 border-t-2 border-pumpkin-500">

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-8 text-center">

                <div className="flex flex-col items-center gap-2">
                    <NavLink to="/">
                        <span className="font-display text-3xl text-cream-50">
                            Spooks <span className="italic text-pumpkin-500">&</span> Clay
                        </span>
                    </NavLink>
                    <p className="font-body text-sm text-bark-300 italic">Small creatures. Handmade with love.</p>
                </div>

                <div className="flex items-center gap-3 w-48">
                    <span className="flex-1 h-px bg-bark-500" />
                    <span className="text-pumpkin-300 text-xs select-none">✦</span>
                    <span className="flex-1 h-px bg-bark-500" />
                </div>

                <nav className="flex flex-wrap justify-center gap-6">
                    <NavLink to="/" end className="font-body text-sm text-bark-300 hover:text-pumpkin-300 transition-colors duration-200">Home</NavLink>
                    <NavLink to="/shop" className="font-body text-sm text-bark-300 hover:text-pumpkin-300 transition-colors duration-200">Shop</NavLink>
                </nav>

                <p className="font-body text-xs text-bark-500">
                    &copy; {new Date().getFullYear()} Spooks &amp; Clay ✦ All rights reserved.
                </p>

            </div>

        </footer>
    )
}

export default Footer;