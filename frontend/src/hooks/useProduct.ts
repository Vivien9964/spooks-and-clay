
import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import type { RequestStatus } from "@/types/api"
import { getProductBySlug } from "@/services/products"
import { ApiError } from "@/services/http"

export function useProduct(slug: string) {

    const [ productData, setProductData ] = useState<Product | null>(null)
    const [ loadingStatus, setLoadingStatus ] = useState<RequestStatus>("loading")
    const [ errorStatus, setErrorStatus ] = useState<number | null>(null)
    const [ reloadKey, setReloadKey ] = useState(0)


    useEffect(() => {

        let ignore = false

        async function loadProduct() {
            try {
                const data = await getProductBySlug(slug)

                if(!ignore) {
                    setProductData(data)
                    setLoadingStatus("success")
                }

            } catch (error) {

                if(!ignore) {
                    setLoadingStatus("error")
                    setErrorStatus(error instanceof ApiError ? error.status : null)
                }
            }
        }

        loadProduct()

        return () => { ignore = true } 

    }, [slug, reloadKey])


    function refetch() {
        setLoadingStatus("loading")
        setErrorStatus(null)
        setReloadKey((key) => key + 1)
    }


    return {
        productData,
        loadingStatus,
        errorStatus,
        refetch
    }


}
