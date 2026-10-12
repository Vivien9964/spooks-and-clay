import { useState, useEffect } from "react"


export function useIsSlow(isLoading: boolean, delayMs = 4000): boolean {

    const [ isSlow, setIsSlow ] = useState(false);

    useEffect(() => {

        if(!isLoading) {
            return
        }

        const timer = setTimeout(() => setIsSlow(true), delayMs)

        return () => {
            clearTimeout(timer)
            setIsSlow(false)
        }

    }, [isLoading, delayMs])

    return isSlow
}