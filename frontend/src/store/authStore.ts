import { create } from "zustand"
import type { User } from "@/types/user"


type AuthStore = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null })
}))

