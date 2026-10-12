import { API_BASE_URL } from "@/config/env"
import { useAuthStore } from "@/store/authStore"



type HttpOptions = {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown
}


export class ApiError extends Error {
   readonly status: number

   constructor(status: number) {
    super(`Request failed with status ${status}`)
    this.name = "ApiError"
    this.status = status
   }
}

const RETRY_DELAYS_MS = [2000, 5000]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function isRetryable(error: unknown): boolean {
    if(error instanceof ApiError) {
        return error.status >= 500
    }

    return true
}


async function sendRequest<T>(path: string, options: HttpOptions): Promise<T> {
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

        throw new ApiError(res.status)

    }

    
    return res.json() as Promise<T>

}







export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {

   const method = options.method ?? "GET"
    const attempts = method === "GET" ? RETRY_DELAYS_MS.length + 1 : 1
 
    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            return await sendRequest<T>(path, options)
        } catch (error) {
            if (attempt === attempts - 1 || !isRetryable(error)) throw error
            await sleep(RETRY_DELAYS_MS[attempt])
        }
    }
 
    throw new Error("unreachable")

} 