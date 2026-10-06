import { useState, useEffect } from "react"
import type { Order } from "@/types/order"
import type { RequestStatus } from "@/types/api"
import { getMyOrders } from "@/services/orders"

export function useOrders(userId: number) {

    const [ orders, setOrders ] = useState<Order[]>([])
    const [ loadingStatus, setLoadingStatus ] = useState<RequestStatus>("loading")
    const [ errors, setErrors ] = useState<string | null>(null)


    useEffect(() => {
        let ignore = false

        async function loadData() {
            try {
                const data = await getMyOrders(userId)
                if(!ignore) {
                    setOrders(data)
                    setLoadingStatus("success")
                }
            } catch {
                if(!ignore) {
                    setLoadingStatus("error")
                    setErrors("Failed to summon your orders!")
                }
            }
        }

        loadData()

        return () => { ignore = true }

    }, [userId])

    return {
        orders,
        loadingStatus,
        errors
    }

}