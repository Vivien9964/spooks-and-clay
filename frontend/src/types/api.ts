import type { Category, ProductImage } from "@/types/product"
import type { User } from "@/types/user"


export type RequestStatus = "loading" | "success" | "error"
export type OrderStatusDto = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export type ProductDto = {
    readonly id: number;
    name: string;
    category: Category;
    shortDesc: string;
    longDesc: string;
    price: string;  
    onSale: boolean;
    discountPercent: number | null;    
    stockCount: number;
    tags?: string[];
    images: ProductImage[];
    slug: string;  
    createdAt: string;
    portfolioFeatured: boolean;
}


export type OrderDto = {
    readonly id: number;
    userId: number;
    status: OrderStatusDto;
    createdAt: string;
    total: string;
    currency: string;
    items: OrderItemDto[];
}

export type OrderItemRequestDto = {
    productId: number;
    quantity: number;
}


export type CreateOrderRequestDto = {
    items: OrderItemRequestDto[];
    recipientName: string;
    street: string;
    city: string;
    region?: string;
    postalCode: string;
    country: string;
    phone: string;
}

export type OrderItemDto = {
    readonly id: number;
    productId: number;
    productName: string;
    price: string;
    quantity: number;
}

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export type ApiError = {
    status: number;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export type AuthResponse = {
    token: string;
    user: User;
}

export type UserDto = {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export type AuthResponseDto = {
    token: string;
    user: UserDto;
}

