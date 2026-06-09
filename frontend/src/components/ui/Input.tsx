import React from "react"
import clsx from "clsx"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
}


function Input({ label, error, ...rest }: InputProps) {
    return(
        <div className="relative">
            <input {...rest} placeholder=" " className={clsx(
                "peer w-full px-3 pt-5 pb-2 rounded-lg border bg-cream-50 text-bark-900 font-body text-sm transition-colors duration-150 focus:outline-none focus:ring-2",
                error
                    ? "border-pumpkin-700 focus:border-pumpkin-700 focus:ring-pumpkin-700"
                    : "border-cream-300 focus:border-pumpkin-500 focus:ring-pumpkin-500"
            )} />
            <label className={clsx(
                "absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm pointer-events-none bg-cream-50 px-1 transition-all duration-150",
                "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs",
                "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-xs",
                error
                    ? "text-pumpkin-700 peer-focus:text-pumpkin-700 peer-[&:not(:placeholder-shown)]:text-pumpkin-700"
                    : "text-bark-300 peer-focus:text-pumpkin-500 peer-[&:not(:placeholder-shown)]:text-bark-700"
            )}>
                {label}
            </label>
            { error && <p className="text-xs font-body text-pumpkin-700 mt-1">{error}</p>}
        </div>
    )
}

export default Input