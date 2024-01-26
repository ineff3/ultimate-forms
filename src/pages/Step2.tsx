import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Container from '../components/Container'
import { z } from 'zod'
import CustomInput from '../components/CustomInput'
import Button from '../components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomCheckbox from '../components/CustomCheckbox'
import parsePhoneNumberFromString from 'libphonenumber-js'
import { useNavigate } from 'react-router-dom'
import { useData } from '../hooks/hooks'
import { DataContextType } from '../contexts/DataProvider'

const validationSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required.')
        .email('This is not a valid email.'),
    hasPhone: z.boolean().optional(),
    phone: z.union([z.string(), z.literal('')])
}).refine((data) => {
    if (data.hasPhone && data.phone === '') return false
    return true
}, {
    message: 'Please enter phone number',
    path: ['phone']
})

// .union([
//     z.literal('checked'),
//     z.literal('unchecked'),
//     z.literal('ideterminate')
// ])
type inferredFormType = z.infer<typeof validationSchema>

const Step2 = () => {
    const { data, setValues } = useData() as DataContextType
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<inferredFormType>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            email: data.email,
            phone: data.phone,
            hasPhone: data.phone !== ''
        }
    })

    const navigate = useNavigate()

    const hasPhone = watch('hasPhone')

    const onSubmit: SubmitHandler<inferredFormType> = (data) => {
        setValues(data)
        // navigate('/result')
        navigate('/step3')
    }

    const normalizePhoneNumber = (value: string) => {
        const phoneNumber = parsePhoneNumberFromString(value)
        if (!phoneNumber) {
            return value;
        }
        return phoneNumber.formatInternational()
    }

    return (
        <Container>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' max-w-[300px] w-full flex flex-col items-center gap-5'
            >
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => <CustomInput
                        {...field}
                        label='Email'
                        type='text'
                        isInvalid={!!errors?.email}
                        errorMessage={errors?.email?.message}
                    />}
                />
                <div className=' self-start'>
                    <Controller
                        name='hasPhone'
                        control={control}
                        render={({ field: { value, onChange } }) => <CustomCheckbox
                            label='Do you have a phone'
                            checked={value}
                            onChange={onChange}
                        />}
                    />
                </div>
                {hasPhone && (
                    <Controller
                        name='phone'
                        control={control}
                        render={({ field }) => <CustomInput
                            {...field}
                            onChange={(e) => field.onChange(normalizePhoneNumber(e.target.value))}
                            label='Phone number'
                            type='tel'
                            isInvalid={!!errors?.phone}
                            errorMessage={errors?.phone?.message}
                        />}
                    />
                )
                }
                <Button label='Next' type='submit' />

            </form>
        </Container>
    )
}

export default Step2