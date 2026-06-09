
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { CircleCheck, CircleX, TriangleAlert, Info } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/features/cart/CartDrawer"



function RootLayout() {
    return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#FDFCF2",
                    border: "1px solid #D4C48A",
                    color: "#1E0A35",
                    fontFamily: "Nunito, sans-serif",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                },
            }}
            icons={{
                success: <CircleCheck size={20} color="#3C7218" />,
                error: <CircleX size={20} color="#E04800" />,
                warning: <TriangleAlert size={20} color="#FFA020" />,
                info: <Info size={20} color="#7A608A" />,
            }}
        />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
    )
}

export default RootLayout;