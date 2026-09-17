
import { useAuthStore } from "@/store/authStore"
import { Outlet, Navigate, useLocation } from "react-router-dom"

function ProtectedRoute() {

    const isLoggedIn = useAuthStore((s) => s.user !== null)

    const isAuthLoading = useAuthStore((s) => s.isAuthLoading)

    const location = useLocation()

    if(isAuthLoading) return null

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location}}/>
}

export default ProtectedRoute