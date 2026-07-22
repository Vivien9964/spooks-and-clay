
import { NavLink, useNavigate, Link } from "react-router-dom"
import clsx from "clsx"
import { ShoppingBasket, Ghost, Menu, X } from 'lucide-react'
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { useAuthStore } from "@/store/authStore"


import Button from "@/components/ui/Button"



const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
    clsx(
        "inline-block px-3 py-1.5 rounded-lg text-base font-body",
        "text-bark-700 transition-all duration-200",
        "hover:rotate-2 hover:bg-gold-100 hover:text-gold-900",
        isActive && "rotate-3 bg-gold-100 text-gold-900"
    )

const mobileLinkStyle = ({ isActive }: { isActive: boolean }) =>
    clsx(
        "font-display text-3xl text-bark-900 transition-colors duration-200",
        "hover:text-pumpkin-500",
        isActive && "rotate-3 text-pumpkin-500"
    )

const navLinks = [
    { to: "/", label: "Home", end: true},
    { to: "/shop",  label: "Shop" },
]


 function Header() {

    const [ isMenuOpen, setIsMenuOpen ] = useState(false)
    const itemCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0))
    const openCart = useUIStore((s) => s.openCart)

    const isLoggedIn = useAuthStore((s) => s.user !== null)
    const logout = useAuthStore((s) => s.logout)
    const navigate = useNavigate()

    const user = useAuthStore((s) => s.user)

    const handleAuthClick = () => {
        if(isLoggedIn) {
            logout()
            navigate("/")
        } else {
            navigate("/login")
        }

        setIsMenuOpen(false)
    }
    

    return (
        <header className="w-full py-4 px-6 sticky top-0 z-50 flex items-center justify-between bg-cream-50 border-b-2 border-bark-900">
            
            <NavLink to="/">
                <span className="text-bark-700 text-2xl font-display font-bold">
                    Spooks <span className="italic text-pumpkin-500">&</span> Clay
                </span>
            </NavLink>
           

            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <NavLink 
                        key={link.to} 
                        to={link.to} 
                        end={link.end}
                        className={navLinkStyle}
                    >
                        {link.label}
                    </NavLink>
                ))}

            </nav>

            <div className="flex gap-6">
                <Button variant="ghost" className="relative" onClick={openCart}><ShoppingBasket className="text-bark-700"/>
                    {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pumpkin-500 text-cream-50 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full border border-bark-900">
                    {itemCount}
                </span>
                )}
                </Button>

                 {isLoggedIn && user && (
                <Link to="/account" className="hidden md:flex items-center text-bark-700 hover:text-pumpkin-700 transition-colors">
                    {user.name}
                </Link>
                )}

                <Button variant="secondary" className="hidden md:inline-flex" onClick={handleAuthClick}>
                    <span className="flex items-center gap-2 text-bark-700">
                        <Ghost />
                        {isLoggedIn ? "Log out" : "Log in"}
                    </span>
                </Button>
                <button
                    className="flex md:hidden p-2 text-bark-700 hover:text-pumpkin-700 transition-colors relative z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden bg-cream-100 border-b border-cream-300">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={mobileLinkStyle}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="flex flex-col items-center gap-4 px-3 py-3 border-t border-cream-300">
                        {isLoggedIn && user && <Link to="/account" onClick={() => setIsMenuOpen(false)}>Hi, {user.name}</Link>}
                        <Button variant="secondary" onClick={handleAuthClick}>
                            <span className="flex items-center gap-2 text-bark-700">
                                <Ghost />
                                {isLoggedIn ? "Log out" : "Log in"}
                            </span>
                        </Button>                     
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header;