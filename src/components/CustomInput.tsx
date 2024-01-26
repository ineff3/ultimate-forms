import React, { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    isInvalid: boolean
    errorMessage?: string
}

const CustomInput = forwardRef(({ label, isInvalid, errorMessage, ...props }: Props, ref: any) => {

    return (
        <div className=' w-full flex flex-col'>
            <div className=' text-[12px] font-semibold mb-1'>{label}</div>
            <input
                className={` border px-3 py-1 w-full rounded-[5px] outline-none text-blurred focus:border-black focus:text-black
                ${isInvalid ? 'border-red-600 focus:border-red-600 text-red-600 focus:text-red-600' : 'border-gray-400'}`}
                ref={ref}
                {...props}
            />

            {isInvalid && (
                <div className=' text-[10px] text-red-600 mt-1'>
                    {errorMessage?.toString()}
                </div>
            )}


        </div>

    )
})

export default CustomInput