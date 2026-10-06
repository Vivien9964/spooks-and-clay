
import type { Address } from "@/types/address"


export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled"

export type OrderItem = {
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    variant?: string;
}

export type Order = {
    id: number;
    userId: number;
    items: OrderItem[];
    status: OrderStatus;
    orderedAt: string;
    deliveredAt?: string;
    shippingAddress?: Address
}