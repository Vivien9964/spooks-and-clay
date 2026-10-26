
import Skeleton from "@/components/ui/Skeleton"

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col h-full bg-cream-50 rounded-2xl shadow-soft overflow-hidden">
 
            <Skeleton className="w-full aspect-square rounded-none" />
 
            <div className="flex flex-col flex-1 gap-3 p-4">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-6 w-1/3 mt-auto" />
                <Skeleton className="h-10 w-full rounded-full" />
            </div>
 
        </div>
    )
}

export default ProductCardSkeleton
