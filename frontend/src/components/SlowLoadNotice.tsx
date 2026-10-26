type SlowLoadNoticeProps = {
    className?: string
}

function SlowLoadNotice({ className = "" }: SlowLoadNoticeProps) {
    return (
        <div className={`bg-cream-50 rounded-2xl shadow-soft p-6 text-center ${className}`}>
            <p className="font-heading font-semibold text-xl text-bark-900">Waking the spooks...</p>
            <p className="font-body text-sm text-bark-700 mt-2">
                This shop runs on free hosting that falls asleep when nobody's around.
                The first visit can take up to a minute.
            </p>
        </div>
    )
}

export default SlowLoadNotice
