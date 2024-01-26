import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
    return (
        <button className=' w-full px-8 py-2 rounded-sm bg-primary text-white uppercase' {...props}>
            {label}
        </button>
    )
}

export default Button