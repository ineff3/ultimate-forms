import React from 'react'
import Container from '../components/Container'
import FileInput from '../components/FileInput'
import Button from '../components/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useData } from '../hooks/hooks'
import { DataContextType } from '../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const validationSchema = z.object({
    file: z.any()
})

type inferredFormType = z.infer<typeof validationSchema>

const Step3 = () => {
    const { data, setValues } = useData() as DataContextType
    const navigate = useNavigate()
    const {
        control,
        handleSubmit
    } = useForm<inferredFormType>({
        defaultValues: {
            file: data.file
        }
    })

    const onSubmit: SubmitHandler<inferredFormType> = (data) => {
        setValues(data)
        navigate('/result')
    }
    return (
        <Container>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' max-w-[300px] w-full flex flex-col items-center gap-5'
            >
                <FileInput
                    control={control}
                    name='file'
                />
                <Button label='Next' type='submit' />
            </form>
        </Container>
    )
}

export default Step3