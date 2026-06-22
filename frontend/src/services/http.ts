import { API_BASE_URL } from "@/config/env"

export async function http<T>(path: string): Promise<T> {

    const res = await fetch(`${API_BASE_URL}${path}`)

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json() as Promise<T>

} 