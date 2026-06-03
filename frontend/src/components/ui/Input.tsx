import React from "react"
import clsx from "clsx"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    error?: string,
}


function Input({ label, error, ...rest }: InputProps) {
    return(
        <div>
            <label>{label}</label>
            <input {...rest} />
            { error && <p>{error}</p>}
        </div>
    )
}

export default Input