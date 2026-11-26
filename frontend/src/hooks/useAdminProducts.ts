import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import type { RequestStatus } from "@/types/api"
import { getAdminProducts } from "@/services/adminProducts"


export function useAdminProducts() {

    const [ products, setProducts ] = useState<Product[]>([])
    const [ loadingStatus, setLoadingStatus ] = useState<RequestStatus>("loading")
    const [ errors, setErrors ] = useState<string | null>(null)
    const [ reloadKey, setReloadKey ] = useState(0)

    useEffect(() => {
        let ignore = false

        async function loadData() {
            try {
                const data = await getAdminProducts()
                if(!ignore) {
                    setProducts(data)
                    setLoadingStatus("success")
                }
            } catch {
                if(!ignore) {
                    setLoadingStatus("error")
                    setErrors("Failed to load products!")
                }
            }
        }

        loadData()

        return () => { ignore = true }

    }, [reloadKey])

    function refetch() {
        setLoadingStatus("loading")
        setErrors(null)
        setReloadKey((key) => key + 1)
    }

    return {
        products,
        loadingStatus,
        errors,
        refetch
    }
}