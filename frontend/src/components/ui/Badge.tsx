import React from "react";
import clsx from "clsx"


interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "warning" | "neutral" | "positive";
}

const baseStyle = "px-2.5 py-0.5 text-xs font-bold font-body uppercase tracking-wide rounded-full"

const styleConfig = {

    warning: "bg-rose-50 text-rose-800",

    neutral: "bg-violet-50 text-violet-700",

    positive: "bg-amber-50 text-amber-900"
}


function Badge({ variant = "neutral", children, className, ...rest}: BadgeProps ) {

    const classes = clsx( baseStyle, styleConfig[variant], className)
    
    return (
        <span className={classes} {...rest}>
            {children}
        </span>
    )
}

export default Badge;