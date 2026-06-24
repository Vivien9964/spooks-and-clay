import { API_BASE_URL } from "@/config/env"
import { useAuthStore } from "@/store/authStore"

export async function http<T>(path: string): Promise<T> {

    const token = localStorage.getItem("token")

    const headers: Record<string, string> = {}

    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL}${path}`, { headers })

    if(!res.ok) {
        if(res.status === 401) {
            useAuthStore.getState().logout()
        }

        throw new Error(res.statusText)
    }

    return res.json() as Promise<T>

} 