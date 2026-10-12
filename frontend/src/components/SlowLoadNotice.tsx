type SlowLoadNoticeProps = {
    className?: string
}

function SlowLoadNotice({ className = "" }: SlowLoadNoticeProps) {
    return (
        <div className={`bg-cream-50 border-2 border-bark-900 shadow-[4px_4px_0px_var(--color-bark-900)] rounded-sm p-6 text-center ${className}`}>
            <p className="font-display text-xl text-bark-900">Waking the hollow...</p>
            <p className="font-body text-sm text-bark-500 mt-2">
                This shop runs on free hosting that falls asleep when nobody's around.
                The first visit can take up to a minute.
            </p>
        </div>
    )
}

export default SlowLoadNotice
