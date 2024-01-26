import React, { ChangeEvent, ChangeEventHandler, HTMLAttributes, InputHTMLAttributes } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from "react-icons/fa6";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    onChange: any
}

const CustomCheckbox = ({ label, onChange, ...props }: Props) => {
    return (
        <div className=' flex gap-3'>
            <Checkbox.Root
                checked={props.checked}
                onCheckedChange={onChange}
                className=" border border-black hover:bg-gray-200 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
            >
                <Checkbox.Indicator className="text-violet11">
                    <FaCheck size={13} />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <p className=' text-sm'>{label}</p>
        </div>
    )
}

export default CustomCheckbox