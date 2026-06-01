
export type Category = "figurines" | "seasonalCollections" | "uniquePieces" | "accessories"

export type DiscountInfo = 
    | { isOnSale: true, discountPercent: number }
    | { isOnSale: false }



export interface ProductImage {
    src: string;
    alt: string;
}

export interface Variant {
    sizes: string[];
    colors: string[];
}

export type Product = {
    readonly id: number;
    name: string;
    category: Category;
    shortDesc: string;
    longDesc: string;
    basePrice: number;    
    stockCount: number;
    variants?: Variant[];
    tags: string[];
    images: ProductImage[];
    slug: string;
    isFeatured?: boolean;
} & DiscountInfo

export type CategoryFilter = Category | "all"

export type SortOrder = "default" |"price-low" | "price-high"
