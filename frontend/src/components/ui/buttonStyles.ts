import clsx from "clsx"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light"
export type ButtonSize = "sm" | "md" | "lg"

const baseStyle = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full cursor-pointer font-body font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"

const styleConfig: Record<ButtonVariant, string> = {

    primary: "bg-pumpkin-500 text-bark-900 shadow-soft hover:bg-pumpkin-300 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
    secondary: "bg-transparent text-bark-900 border border-bark-500/60 hover:bg-cream-200 hover:border-bark-700",
    ghost: "bg-transparent text-bark-700 hover:text-bark-900 hover:bg-cream-200",
    light: "bg-cream-50 text-bark-900 shadow-soft hover:bg-cream-100 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"

}

const sizeConfig: Record<ButtonSize, string> = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
}

export const textLinkClasses = "font-bold text-pumpkin-700 underline underline-offset-4 decoration-pumpkin-300 hover:decoration-pumpkin-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700"

export function buttonClasses(variant: ButtonVariant = "primary", className?: string, size: ButtonSize = "md") {
    return clsx(baseStyle, styleConfig[variant], sizeConfig[size], className)
}
