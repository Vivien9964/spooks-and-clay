

export type UserRole = "customer" |  "admin"

export type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
}

