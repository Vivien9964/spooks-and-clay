
import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/features/cart/CartDrawer"


function RootLayout() {
    return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
    )
}

export default RootLayout;