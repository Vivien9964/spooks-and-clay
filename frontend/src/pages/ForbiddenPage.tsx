import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"

function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center">
 
            <div className="flex items-center gap-3 w-40">
                <span className="flex-1 h-px bg-bark-300" />
                <span className="text-bark-300 text-sm">✦</span>
                <span className="flex-1 h-px bg-bark-300" />
            </div>
 
            <h1 className="font-display text-6xl md:text-7xl text-bark-900 leading-tight">
                403
            </h1>
 
            <p className="font-display text-2xl text-bark-700">
                This corner is warded off limits!
            </p>
 
            <p className="font-body text-base text-bark-500 max-w-sm">
                You don't have permission to wander in here.
            </p>
 
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link to="/">
                    <Button variant="primary">Back home</Button>
                </Link>
            </div>
 
        </div>
    )
}

export default ForbiddenPage