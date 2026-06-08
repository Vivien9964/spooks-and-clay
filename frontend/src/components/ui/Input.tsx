import React from "react"
import clsx from "clsx"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
}


function Input({ label, error, ...rest }: InputProps) {
    return(
        <div className="flex flex-col gap-1">
            <label className="font-body text-sm font-semibold text-bark-700">{label}</label>
            <input {...rest} className={clsx(
                "w-full px-3 py-2.5 rounded-lg border bg-cream-50 text-bark-900 font-body text-sm placeholder:text-bark-300 transition-colors duration-150 focus:outline-none focus:ring-2",
                error
                    ? "border-pumpkin-700 focus:border-pumpkin-700 focus:ring-pumpkin-700"
                    : "border-cream-300 focus:border-pumpkin-500 focus:ring-pumpkin-500"
            )} />
            { error && <p className="text-xs font-body text-pumpkin-700 mt-0.5">{error}</p>}
        </div>
    )
}

export default Input