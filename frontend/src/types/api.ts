import type { Category, ProductImage } from "@/types/product"


export type RequestStatus = "loading" | "success" | "error"

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
    tags: string[];
    images: ProductImage[];
    slug: string;  
    createdAt: string;
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
