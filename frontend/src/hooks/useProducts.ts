import { useState, useEffect, useMemo } from "react"
import type { CategoryFilter, SortOrder, Product } from "@/types/product"
import { getProducts } from "@/services/products"
//import { products } from "@/data/products"


type UseProductsArgs = {
    searchTerm: string;
    selectedCategory: CategoryFilter;
    sortOrder: SortOrder;
}

type Status = "loading" | "success" | "error"


export function useProducts({ searchTerm, selectedCategory, sortOrder}: UseProductsArgs) {

    const [ debouncedSearchTerm, setDebouncedSearchTerm ] = useState("")
    const [ productsData, setProductsData ] = useState<Product[]>([])
    const [ loadingStatus, setLoadingStatus ] = useState<Status>("loading")
    const [ errors, setErrors ] = useState<string | null>(null)

    const productCategories = [...new Set(productsData.map((product) => product.category))];


    const sortedProducts = useMemo(() => {

        const filteredProducts = productsData
                                .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
                                .filter((product) => debouncedSearchTerm === "" || product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))

        const sorted = [...filteredProducts];

        if(sortOrder === "price-low") {
            sorted.sort((a, b) => a.basePrice - b.basePrice)

        } else if( sortOrder === "price-high") {
            sorted.sort((a, b) => b.basePrice - a.basePrice)
        }

        return sorted;

    }, [productsData, debouncedSearchTerm, selectedCategory, sortOrder])

    
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300)
        return () => clearTimeout(timer)
    }, [searchTerm])


    useEffect(() => {

        let ignore = false
       
        async function loadData() {
            try{
                const data = await getProducts()
                if(!ignore) {
                    setProductsData(data)
                    setLoadingStatus("success")
                }

            } catch (err) {
                if(!ignore) {
                    setLoadingStatus("error")
                    setErrors("Failed to load products!")
                }
            } 
            
       }

       loadData()

       return () => { ignore = true }

    }, [])
    




    return {
        productCategories,
        sortedProducts,
        loadingStatus,
        errors
    }


} 