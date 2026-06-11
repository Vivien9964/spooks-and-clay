
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

