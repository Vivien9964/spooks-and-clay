import { useState, useEffect, useMemo } from "react"
import type { CategoryFilter, SortOrder } from "@/types/product"
import { products } from "@/data/products"


type UseProductsArgs = {
    searchTerm: string;
    selectedCategory: CategoryFilter;
    sortOrder: SortOrder;
}


export function useProducts({ searchTerm, selectedCategory, sortOrder}: UseProductsArgs) {

    const productCategories = [...new Set(products.map((product) => product.category))];
    const [ debouncedSearchTerm, setDebouncedSearchTerm ] = useState("")

    const sortedProducts = useMemo(() => {

        const filteredProducts = products
                                .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
                                .filter((product) => debouncedSearchTerm === "" || product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))

        const sorted = [...filteredProducts];

        if(sortOrder === "price-low") {
            sorted.sort((a, b) => a.basePrice - b.basePrice)

        } else if( sortOrder === "price-high") {
            sorted.sort((a, b) => b.basePrice - a.basePrice)
        }

        return sorted;

    }, [debouncedSearchTerm, selectedCategory, sortOrder])

    
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300)
        return () => clearTimeout(timer)
    }, [searchTerm])
    




    return {
        productCategories,
        sortedProducts
    }


} 