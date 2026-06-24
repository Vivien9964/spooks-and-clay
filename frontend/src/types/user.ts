
import type { Address } from "@/types/address"

export type UserRole = "customer" |  "admin"

export type User = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
    role: UserRole;
    createdAt: string;
}


export type LoginPayload = Pick<User, "email"> & { password: string }

export type RegisterPayload = Pick<User, "name" | "email"> & { password: string }

export type UpdateProfilePayload = Partial<Pick<User, "name" | "email" | "phone" | "address">> & { id: number }


