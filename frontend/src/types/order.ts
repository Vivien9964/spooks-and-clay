
import type { Address } from "@/types/address"


export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

export type OrderItem = {
    productName: string;
    unitPrice: number;
    quantity: number;
    variant?: string;
}

export type Order = {
    orderId: number;
    userId: number;
    items: OrderItem[];
    status: OrderStatus;
    orderedAt: string;
    deliveredAt?: string;
    shippingAddress: Address
}