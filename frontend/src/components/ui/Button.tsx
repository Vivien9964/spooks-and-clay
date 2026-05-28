import clsx from "clsx"
import React from "react"
// ButtonProps interface is used to get all predefined button
// attributes and add a variant attribute to it
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
}

// Base style and style config can stay 
const baseStyle = "px-4 py-2 rounded-xl cursor-pointer font-body font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

const styleConfig = {

    primary: "bg-pumpkin-500 hover:bg-pumpkin-700 text-bark-900",

    secondary: "bg-transparent border border-pumpkin-500 text-pumpkin-700 hover:bg-pumpkin-100 hover:border-pumpkin-700",

    ghost: "bg-transparent text-bark-500 hover:text-bark-700 hover:bg-cream-200"
}


// Main component
function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {

    // Using clsx to create complete styles without messy concatenation 
    // Even if extra className is missing, clsx will skip it and show only base + styleConfig
    const classes = clsx( baseStyle, styleConfig[variant], className)

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    )
}

export default Button;


