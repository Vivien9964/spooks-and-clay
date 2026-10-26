
import { NavLink, useNavigate, Link } from "react-router-dom"
import clsx from "clsx"
import { ShoppingBasket, UserRound, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { useAuthStore } from "@/store/authStore"


import Button from "@/components/ui/Button"
import { buttonClasses } from "@/components/ui/buttonStyles"



const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
    clsx(
        "inline-block px-4 py-1.5 rounded-full text-base font-body font-medium",
        "text-bark-700 transition-all duration-200",
        "hover:bg-honey-100 hover:text-bark-900 hover:-rotate-2",
        isActive && "bg-honey-300 text-bark-900"
    )

const mobileLinkStyle = ({ isActive }: { isActive: boolean }) =>
    clsx(
        "font-display text-5xl text-bark-900 transition-colors duration-200",
        "hover:text-pumpkin-700",
        isActive && "text-pumpkin-700"
    )

const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/shop",  label: "Shop" },
    { to: "/portfolio", label: "Portfolio" },
]


 function Header() {

    const [ isMenuOpen, setIsMenuOpen ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    const itemCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0))
    const openCart = useUIStore((s) => s.openCart)

    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const navigate = useNavigate()

    const isAdmin = user?.role === "admin"
    const initial = user?.name.trim().charAt(0).toUpperCase() || "?"

    const closeMenu = () => setIsMenuOpen(false)

    const handleLogout = () => {
        logout()
        navigate("/")
        closeMenu()
    }

    useEffect(() => {
        if (!isMenuOpen) return

        const menuButton = menuButtonRef.current
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const focusables = () => Array.from(
            menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
        )
        focusables()[0]?.focus()

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false)
                return
            }
            if (e.key !== "Tab") return

            const items = focusables()
            if (items.length === 0) return
            const first = items[0]
            const last = items[items.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", onKeyDown)
            menuButton?.focus()
        }
    }, [isMenuOpen])
    

    return (
        <>
        <header className="w-full py-3 px-3 sm:px-4 md:px-6 sticky top-0 z-50 flex items-center justify-between gap-2 sm:gap-4 bg-cream-50/90 backdrop-blur-sm shadow-soft">
            
            {/* Navigation to home, logo */}
            <NavLink to="/" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700">
                <span className="font-display text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl text-bark-900 whitespace-nowrap">
                    Spooks <span className="text-pumpkin-500">&</span> Clay
                </span>
            </NavLink>
           
            {/* Navigation links to other pages */}
            <nav aria-label="Main" className="hidden md:flex items-center gap-2">
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
                {/* For admins, this NavLink navigates to /admin/products, the admin dashboard */}
                {isAdmin && (
                    <NavLink to="/admin/products" className={navLinkStyle}>Admin</NavLink>
                )}
            </nav>
            
            {/* Account actions based on user login status, cart button, mobile menu button */}
            <div className="flex items-center gap-2 md:gap-3">

                {/* For logged in users, show account link and logout button */}
                {user ? (
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/account"
                            aria-label={`Your account (${user.name})`}
                            title={user.name}
                            className="w-9 h-9 rounded-full bg-moss-500 text-cream-50 font-heading font-bold flex items-center justify-center hover:bg-moss-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 focus-visible:ring-offset-2"
                        >
                            {initial}
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
                    </div>
                ) : (
                    // Wrapper does the hiding: "hidden" on the Link itself would clash with the button's "inline-flex"
                    <div className="hidden md:block">
                        <Link to="/login" className={buttonClasses("secondary", undefined, "sm")}>
                            <UserRound size={16} aria-hidden="true" />
                            Sign in
                        </Link>
                    </div>
                )}

                {/* Guests see a "Sign in" link instead (the ": (" branch above) */}

                {/* Cart button with item count */}
                <button
                    type="button"
                    onClick={openCart}
                    aria-label={itemCount > 0 ? `Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}` : "Open cart"}
                    className="relative w-11 h-11 rounded-full bg-pumpkin-500 text-bark-900 flex items-center justify-center shadow-soft hover:bg-pumpkin-300 hover:-translate-y-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 focus-visible:ring-offset-2"
                >
                    <ShoppingBasket size={22} aria-hidden="true" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-bark-900 text-cream-50 text-xs font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </button>

                <button
                    ref={menuButtonRef}
                    type="button"
                    className="flex md:hidden p-2 rounded-full text-bark-900 hover:bg-cream-200 transition-colors cursor-pointer"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <Menu size={26} />
                </button>
            </div>

        </header>

        {/* Mobile menu lives outside <header>: the header's backdrop-blur would otherwise trap "fixed" inside the header box */}
        {isMenuOpen && (
            <div
                id="mobile-menu"
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="fixed inset-0 z-[60] md:hidden bg-cream-100 flex flex-col items-center justify-center gap-8 px-6"
            >
                <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="absolute top-4 right-4 p-2 rounded-full text-bark-900 hover:bg-cream-200 transition-colors cursor-pointer"
                >
                    <X size={28} />
                </button>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={mobileLinkStyle}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    {isAdmin && (
                        <NavLink to="/admin/products" className={mobileLinkStyle} onClick={closeMenu}>Admin</NavLink>
                    )}
                    <div className="flex flex-col items-center gap-3 pt-6 mt-2 border-t border-cream-300 w-48">
                        {user ? (
                            <>
                                <Link to="/account" onClick={closeMenu} className="font-heading text-lg text-bark-900">Hi, {user.name}</Link>
                                <Button variant="secondary" onClick={handleLogout}>Log out</Button>
                            </>
                        ) : (
                            <Link to="/login" onClick={closeMenu} className={buttonClasses("secondary")}>
                                <UserRound size={18} aria-hidden="true" />
                                Sign in
                            </Link>
                        )}
                    </div>
            </div>
        )}
        </>
    )
}

export default Header;
