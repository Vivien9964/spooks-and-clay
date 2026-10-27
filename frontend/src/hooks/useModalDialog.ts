import { useEffect, useRef } from "react"

const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"

// Shared behaviour for overlays (mobile menu, cart drawer): Escape closes, Tab stays inside,
// the page behind can't scroll, and focus goes back to whatever opened the overlay
export function useModalDialog<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {

    const containerRef = useRef<T>(null)
    const onCloseRef = useRef(onClose)

    useEffect(() => {
        onCloseRef.current = onClose
    })

    useEffect(() => {
        if (!isOpen) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const focusables = () => Array.from(
            containerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
        )
        focusables()[0]?.focus()

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onCloseRef.current()
                return
            }
            if (e.key !== "Tab") return

            const items = focusables()
            if (items.length === 0) return
            const first = items[0]
            const last = items[items.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", onKeyDown)
            previouslyFocused?.focus()
        }
    }, [isOpen])

    return containerRef
}
