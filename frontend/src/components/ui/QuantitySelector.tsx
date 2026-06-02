
import Button from "@/components/ui/Button"


type QuantitySelectorProps = {
    
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
}


function QuantitySelector({ quantity, onIncrement, onDecrement, min = 1, max }: QuantitySelectorProps) {

    return (
        <div className="flex items-center justify-center gap-4">

        <Button 
            variant="ghost"
            onClick={onDecrement}
            disabled={ quantity <= min}
        >
            -
        </Button>
        <span>
            {quantity}
        </span>
        <Button 
            variant="ghost"
            onClick={onIncrement}
            disabled={ max !== undefined && quantity >= max}
        >
            +
        </Button>

        </div>
    )
}

export default QuantitySelector