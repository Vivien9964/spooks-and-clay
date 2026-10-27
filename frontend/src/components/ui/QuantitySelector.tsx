
import { Minus, Plus } from "lucide-react"


type QuantitySelectorProps = {
    
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
    label?: string;
}

const stepButton = "w-8 h-8 rounded-full flex items-center justify-center text-bark-900 hover:bg-cream-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"

function QuantitySelector({ quantity, onIncrement, onDecrement, min = 1, max, label }: QuantitySelectorProps) {

    const suffix = label ? ` of ${label}` : ""

    return (
        <div role="group" aria-label={`Quantity${suffix}`} className="inline-flex items-center gap-1 rounded-full bg-cream-200 p-0.5">

        <button
            type="button"
            className={stepButton}
            onClick={onDecrement}
            disabled={ quantity <= min}
            aria-label={`Decrease quantity${suffix}`}
        >
            <Minus size={14} aria-hidden="true" />
        </button>
        <span className="min-w-6 text-center font-body font-bold text-sm text-bark-900" aria-live="polite">
            {quantity}
        </span>
        <button
            type="button"
            className={stepButton}
            onClick={onIncrement}
            disabled={ max !== undefined && quantity >= max}
            aria-label={`Increase quantity${suffix}`}
        >
            <Plus size={14} aria-hidden="true" />
        </button>

        </div>
    )
}

export default QuantitySelector
