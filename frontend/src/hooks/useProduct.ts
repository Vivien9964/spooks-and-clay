
import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import type { RequestStatus } from "@/types/api"
import { getProductBySlug } from "@/services/products"

export function useProduct(slug: string) {

    const [ productData, setProductData ] = useState<Product | null>(null)
    const [ loadingStatus, setLoadingStatus ] = useState<RequestStatus>("loading")
    const [ errors, setErrors ] = useState<string | null>(null)


    useEffect(() => {

        let ignore = false
        setLoadingStatus("loading")

        async function loadProduct() {
            try {
                const data = await getProductBySlug(slug)

                if(!ignore) {
                    setProductData(data)
                    setLoadingStatus("success")
                }
            } catch (err) {

                if(!ignore) {
                    setLoadingStatus("error")
                    setErrors("Failed to load product!")
                }
            }
        }

        loadProduct()

        return () => { ignore = true } 

    }, [slug])


    return {
        productData,
        loadingStatus,
        errors
    }


}
