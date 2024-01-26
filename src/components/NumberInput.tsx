import React, { forwardRef } from 'react'
import { AriaNumberFieldProps, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';

const NumberInput = forwardRef((props: AriaNumberFieldProps, ref: any) => {
    const { locale } = useLocale();
    const state = useNumberFieldState({ ...props, locale });
    const inputRef = React.useRef(null);
    const {
        labelProps,
        groupProps,
        inputProps,
        errorMessageProps
    } = useNumberField(props, state, inputRef);

    return (
        <div className=' flex flex-col max-w-[350px] w-full'>
            <label className=' text-sm' {...labelProps}>{props.label}</label>
            <div
                className=' border border-black rounded-xl px-3 py-1 mt-1 '
                {...groupProps}
            >
                <input
                    className=' outline-none w-full'
                    {...inputProps}
                    ref={inputRef}
                />
            </div>
            {props?.isInvalid && (
                <div
                    {...errorMessageProps}
                    className=' text-[10px] text-red-600 mt-1'
                >
                    {props?.errorMessage?.toString()}
                </div>
            )}
        </div>
    );
})

export default NumberInput