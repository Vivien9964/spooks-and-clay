import { Link } from "react-router-dom"

function ErrorFallbackPage() {
    return (
        <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center text-center px-6 gap-6">
            <h1 className="font-display text-4xl text-bark-900">
                Something wicked this way broke...
            </h1>
            <p className="font-body text-bark-500 max-w-sm">
                A mischievous spirit crept into the enchanted hollow. Give it a refresh, or float back home while our witches brew a fix.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="font-body text-bark-700 underline hover:text-pumpkin-500 transition-colors"
                >
                    Refresh
                </button>
                <Link
                    to="/"
                    className="font-body bg-pumpkin-500 text-cream-50 px-6 py-2 rounded-lg hover:bg-pumpkin-700 transition-colors"
                >
                    Back to home
                </Link>
            </div>
        </div>
    )
}

export default ErrorFallbackPage
