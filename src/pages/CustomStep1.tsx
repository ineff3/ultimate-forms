import Container from '../components/Container'
import Button from '../components/Button'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import { ChangeEvent } from 'react'
import { useData } from '../hooks/hooks'
import { DataContextType } from '../contexts/DataProvider'

const getFieldSchema = (fieldName: string) => {
    return z
        .string()
        .regex(/^([^0-9]*)$/, `${fieldName} sould not contain numbers`)
        .min(1, `${fieldName} is a required field`)
        .trim()
}

const validationSchema = z.object({
    firstName: getFieldSchema('First name'),
    lastName: z.union([getFieldSchema('Last name'), z.literal('')]),
    age: z.union([z
        .number()
        .int()
        .min(18, 'Minimum 18 years')
        .max(99, 'Maximum 99 years'),
    z.literal('')])

})


// lastName: z.union([getFieldSchema('Last name'), z.literal('')]),


type formInputType = z.infer<typeof validationSchema>

const Step1 = () => {
    const { data, setValues } = useData() as DataContextType
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<formInputType>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age
        }
    });

    const navigate = useNavigate();



    const onSubmit: SubmitHandler<formInputType> = (data) => {
        setValues(data)
        navigate('/step2')
    }

    function removeEmptyValues(obj: object) {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([key, value]) => value !== undefined && !Number.isNaN(value) && value !== '')
        );
    }

    const handleEmptyStringOrNumber = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') return ''
        const output = Number(e.target.value)
        return isNaN(output) ? '' : output
    }

    return (
        <Container>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' max-w-[300px] w-full flex flex-col items-center gap-5'
            >
                <CustomInput
                    {...register('firstName')}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors?.firstName?.message}
                    label='First name'
                />

                <CustomInput
                    {...register('lastName')}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors?.lastName?.message}
                    label='Last name'
                />
                <Controller
                    name='age'
                    control={control}
                    render={({ field }) => <CustomInput
                        {...field}
                        type='number'
                        onChange={(e) => field.onChange(handleEmptyStringOrNumber(e))}
                        isInvalid={!!errors.age}
                        errorMessage={errors?.age?.message}
                        label='Age'

                    />}
                />

                <Button label='Next' type='submit' />

            </form>
        </Container>
    )
}

export default Step1

{/* <Controller
                    name='firstName'
                    control={control}
                    render={({ field }) => <CustomInput
                        {...field}
                        isInvalid={!!errors.firstName}
                        errorMessage={errors?.firstName?.message}
                        label='First name'
                    />}
                /> */}