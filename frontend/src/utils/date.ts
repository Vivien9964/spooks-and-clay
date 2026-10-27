
export function formatDate(iso: string, month: "short" | "long" = "short"): string {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric" })
}
