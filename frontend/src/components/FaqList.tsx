import { Plus } from "lucide-react"
import type { FaqItem } from "@/data/faq"

interface FaqListProps {
    items: FaqItem[]
}

function FaqList({ items }: FaqListProps) {
    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <details key={item.question} className="group bg-cream-50 rounded-2xl shadow-soft open:shadow-lift transition-shadow">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 rounded-2xl font-heading text-lg font-semibold text-bark-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <Plus aria-hidden="true" className="shrink-0 text-pumpkin-700 transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className="px-5 pb-5 font-body text-base text-bark-700 leading-relaxed">{item.answer}</p>
                </details>
            ))}
        </div>
    )
}

export default FaqList
