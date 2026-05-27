import clsx from "clsx"
import React from "react"
// ButtonProps interface is used to get all predefined button
// attributes and add a variant attribute to it
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
}

// Base style and style config can stay 
const baseStyle = "px-4 py-2 rounded-xl cursor-pointer font-body font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

const styleConfig = {

    primary: "bg-orange-400 hover:bg-orange-500 text-amber-950 border-orange-700 hover:border-orange-700",

    secondary: "bg-transparent hover:bg-orange-50 text-orange-600 hover:text-orange-700 border-orange-600",

    ghost: "bg-transparent text-stone-500 hover:text-stone-700 border-transparent"
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


