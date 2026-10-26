import React from "react"
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/buttonStyles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
}



function Button({ variant = "primary", size = "md", children, className, ...rest }: ButtonProps) {

    // Using clsx (inside buttonClasses) to create complete styles without messy concatenation 
    // Even if extra an className is missing, clsx will skip it and show only the base + styleConfig
    const classes = buttonClasses(variant, className, size)

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    )

}



export default Button;
