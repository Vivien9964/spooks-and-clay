
import type { LoginPayload, RegisterPayload, User, UserRole } from "@/types/user"
import type { AuthResponse, AuthResponseDto, UserDto } from "@/types/api"
import { http } from "@/services/http"


function toUser(dto: UserDto): User {
    return {
        id: dto.id,
        name: dto.name,
        email: dto.email,
        role: dto.role.toLowerCase() as UserRole,
        createdAt: dto.createdAt
    }
}


export async function getMe(): Promise<User> {
    const dto = await http<UserDto>("/users/me")
    return toUser(dto)
}


export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
    
    const res = await http<AuthResponseDto>("/auth/login", {
        method: "POST",
        body: payload
    })
    
    return { token: res.token, user: toUser(res.user) }

    /*
    return {
        token: "hggdg5d54d5d55dssjhsysujs8s9s6s6s5ds6d5cd56c56d",
        user: { id: 1, name: "John Doe", email: "john.doe@example.com", role: "customer", createdAt: new Date().toISOString() }
    }
    */
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
    
    await http<User>("/auth/register", { 
        method: "POST",
        body: payload 
    })

    return loginUser({ email: payload.email, password: payload.password })
    
  
    /*
    return {
        token: "hggdg5d54d5d55dssjhsysujs8s9s6s6s5ds6d5cd56c56d",
        user: { id: 1, name: "John Doe", email: "john.doe@example.com", role: "customer", createdAt: new Date().toISOString() }
    }
    */
}

