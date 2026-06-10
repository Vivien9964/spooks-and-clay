
import { useAuthStore } from "@/store/authStore"
import { Outlet, Navigate, useLocation } from "react-router-dom"

function ProtectedRoute() {

    const isLoggedIn = useAuthStore((s) => s.user !== null)

    const location = useLocation()

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location}}/>
}

export default ProtectedRoute