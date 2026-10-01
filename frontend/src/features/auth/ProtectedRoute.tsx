import { useAuthStore } from "@/store/authStore"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import type { UserRole } from "@/types/user"


type ProtectedRouteProps = {
    requireRole?: UserRole
}



function ProtectedRoute({ requireRole }: ProtectedRouteProps) {

    const user = useAuthStore((s) => s.user)
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading)

    const location = useLocation()

    if(isAuthLoading) return null

    if(!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if(requireRole && user.role !== requireRole) {
        return <Navigate to="/403" replace />
    }

    return <Outlet />

}

export default ProtectedRoute