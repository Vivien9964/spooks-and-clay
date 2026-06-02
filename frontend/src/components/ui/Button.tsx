import clsx from "clsx"

import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
}



const baseStyle = "px-4 py-2 rounded-sm cursor-pointer font-body font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

const styleConfig = {

    primary: "bg-pumpkin-500 text-bark-900 border-2 border-bark-900 shadow-[3px_3px_0px_var(--color-bark-900)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--color-bark-900)]",
    secondary: "bg-transparent hover:bg-pumpkin-100 text-pumpkin-700 hover:text-pumpkin-900 border-2 border-pumpkin-700 hover:border-pumpkin-900",
    ghost: "bg-transparent text-bark-500 hover:text-bark-700 border-transparent"

}



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





