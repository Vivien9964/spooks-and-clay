import React from "react";
import clsx from "clsx"


interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "warning" | "neutral" | "payment" | "positive" | "sale";
}

const baseStyle = "inline-block px-2.5 py-0.5 text-xs font-bold font-body tracking-wide rounded-full"

const styleConfig = {

    warning: "bg-pumpkin-300 text-bark-900",

    neutral: "bg-honey-100 text-bark-700",

    payment: "bg-cream-200 text-pumpkin-900",

    positive: "bg-pumpkin-100 text-pumpkin-900",

    sale: "bg-berry-500 text-cream-50"
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