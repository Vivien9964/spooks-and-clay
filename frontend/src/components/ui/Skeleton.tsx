
import clsx from "clsx"


type SkeletonProps = {
    className?: string
}


function Skeleton({ className }: SkeletonProps) {

    return (
        <div className={clsx("animate-pulse bg-cream-300 rounded-md", className)} />
    )
}

export default Skeleton