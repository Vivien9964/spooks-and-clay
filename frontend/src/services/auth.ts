
import type { LoginPayload, RegisterPayload } from "@/types/user"
import type { AuthResponse } from "@/types/api"


export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
    return {
        token: "hggdg5d54d5d55dssjhsysujs8s9s6s6s5ds6d5cd56c56d",
        user: { id: 1, name: "John Doe", email: "john.doe@example.com", role: "customer", createdAt: new Date().toISOString() }
    }
}


export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
    return {
        token: "hggdg5d54d5d55dssjhsysujs8s9s6s6s5ds6d5cd56c56d",
        user: { id: 1, name: "John Doe", email: "john.doe@example.com", role: "customer", createdAt: new Date().toISOString() }
    }
}