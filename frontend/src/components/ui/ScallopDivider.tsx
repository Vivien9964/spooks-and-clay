import clsx from "clsx"

interface ScallopDividerProps {
    colorClass: string
    flip?: boolean
    className?: string
}

function ScallopDivider({ colorClass, flip = false, className }: ScallopDividerProps) {
    return (
        <div aria-hidden="true" className={clsx("w-full -my-px", flip && "rotate-180", className)}>
            <div className={clsx("wave", colorClass)} />
        </div>
    )
}

export default ScallopDivider
