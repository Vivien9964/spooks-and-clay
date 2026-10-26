
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { CircleCheck, CircleX, TriangleAlert, Info } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/features/cart/CartDrawer"



function RootLayout() {
    return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
        <Header />
        <CartDrawer />
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "var(--color-cream-50)",
                    border: "none",
                    color: "var(--color-bark-900)",
                    fontFamily: "var(--font-body)",
                    borderRadius: "1rem",
                    boxShadow: "var(--shadow-lift)",
                },
            }}
            icons={{
                success: <CircleCheck size={20} color="var(--color-moss-500)" />,
                error: <CircleX size={20} color="var(--color-berry-500)" />,
                warning: <TriangleAlert size={20} color="var(--color-pumpkin-700)" />,
                info: <Info size={20} color="var(--color-bark-500)" />,
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