import { API_BASE_URL } from "@/config/env"
import { useAuthStore } from "@/store/authStore"


type HttpOptions = {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown
}


export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {

    const token = localStorage.getItem("token")

    const headers: Record<string, string> = {}

    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    if(options.body) {
        headers["Content-Type"] = "application/json"
    }

    const res = await fetch(`${API_BASE_URL}${path}`, { 
        headers, 
        method: options.method,
        body: options.body ? JSON.stringify(options.body) : undefined
    })

    if(!res.ok) {
        if(res.status === 401) {
            useAuthStore.getState().logout()
        }

        throw new Error(res.statusText)
    }

    return res.json() as Promise<T>

} 