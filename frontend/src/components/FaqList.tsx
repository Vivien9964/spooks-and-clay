import { Plus } from "lucide-react"
import type { FaqItem } from "@/data/faq"

type FaqVariant = "card" | "plain"

interface FaqListProps {
    items: FaqItem[]
    variant?: FaqVariant
}

const variantClasses: Record<FaqVariant, { list: string; item: string; summary: string; answer: string }> = {
    card: {
        list: "flex flex-col gap-3",
        item: "bg-cream-50 rounded-2xl shadow-soft open:shadow-lift transition-shadow",
        summary: "px-5 py-4 rounded-2xl text-lg",
        answer: "px-5 pb-5",
    },
    plain: {
        list: "flex flex-col border-t border-cream-300",
        item: "border-b border-cream-300",
        summary: "py-4 rounded-lg text-base",
        answer: "pb-4",
    },
}

function FaqList({ items, variant = "card" }: FaqListProps) {
    const classes = variantClasses[variant]

    return (
        <div className={classes.list}>
            {items.map((item) => (
                <details key={item.question} className={`group ${classes.item}`}>
                    <summary className={`flex items-center justify-between gap-4 cursor-pointer list-none font-heading font-semibold text-bark-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 [&::-webkit-details-marker]:hidden ${classes.summary}`}>
                        {item.question}
                        <Plus aria-hidden="true" className="shrink-0 text-pumpkin-700 transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className={`font-body text-base text-bark-700 leading-relaxed ${classes.answer}`}>{item.answer}</p>
                </details>
            ))}
        </div>
    )
}

export default FaqList
