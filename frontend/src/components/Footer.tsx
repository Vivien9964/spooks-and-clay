import { NavLink } from "react-router-dom"

function Footer() {
    return(
        <footer className="py-4 px-6 sticky bottom-0 border-t border-cream-200 flex justify-center items-center gap-4 ">
            <NavLink to="/">
                <span className="text-bark-700 text-2xl font-display font-bold">
                    Spooks <span className="italic text-pumpkin-500">&</span> Clay
                </span>
            </NavLink>

            <p>All rights reserved.</p>
        </footer>
    )
}

export default Footer;