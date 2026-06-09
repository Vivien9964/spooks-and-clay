
import Skeleton from "@/components/ui/Skeleton"

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col h-full bg-cream-50 border-2 border-bark-900 rounded-sm shadow-[3px_3px_0px_var(--color-bark-900)]">
 
            <Skeleton className="w-full aspect-square rounded-none border-b-2 border-bark-900" />
 
            <div className="flex flex-col flex-1 gap-3 p-4">
                <Skeleton className="h-3 w-1/3 mx-auto" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-6 w-1/3 mt-auto" />
                <div className="flex gap-2 pt-1">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-16" />
                </div>
            </div>
 
        </div>
    )
}

export default ProductCardSkeleton