import { create } from "zustand"
import type { User } from "@/types/user"
import type { AuthResponse } from "@/types/api"


type AuthStore = {
    token: string | null,
    user: User | null,
    login: (response: AuthResponse) => void,
    logout: () => void
}

const token = localStorage.getItem("token")

export const useAuthStore = create<AuthStore>((set) => ({
    token: token,
    user: null,

   login: (response) => {
        localStorage.setItem("token", response.token)
        set({ token: response.token, user: response.user })
    },

    logout: () => {
        localStorage.removeItem("token")
        set({ token: null, user: null })
    }
}))

