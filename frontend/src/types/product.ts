
export type Category = "autumnScenes" | "halloweenScenes" | "collections"

export type DiscountInfo = 
    | { isOnSale: true, discountPercent: number }
    | { isOnSale: false }



export interface ProductImage {
    src: string;
    alt: string;
}

export type Product = {
    readonly id: number;
    name: string;
    category: Category;
    shortDesc: string;
    longDesc: string;
    basePrice: number;    
    stockCount: number;
    images: ProductImage[];
    slug: string;
    isFeatured?: boolean;
    heightCm: number | null;
    widthCm: number | null;
    weightG: number | null;
    materials: string[];
} & DiscountInfo

export type CategoryFilter = Category | "all"

export type SortOrder = "default" |"price-low" | "price-high"

