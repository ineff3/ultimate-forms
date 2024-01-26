import { createContext, useState } from 'react'
import { FileWithPath } from 'react-dropzone';


export interface DataContextType {
    data: SubmitDataType;
    setValues: (values: Partial<SubmitDataType>) => void;
}

interface SubmitDataType {
    firstName: string,
    lastName?: string,
    age?: number | '',
    email: string,
    phone?: string,
    file?: FileWithPath[],
    hasPhone?: boolean
}

export const defaultValues = {
    firstName: '',
    lastName: '',
    age: '' as const,
    email: '',
    phone: '',
    hasPhone: false,
    file: []
}

export const DataContext = createContext<DataContextType | null>(null)

export const DataProvider = ({ children }: { children: JSX.Element }) => {
    const [data, setData] = useState<SubmitDataType>(defaultValues)

    const setValues = (values: Partial<SubmitDataType>) => {
        setData((prev) => {
            return {
                ...prev,
                ...values
            }
        })
    }

    return (
        <DataContext.Provider value={{ data, setValues }}>
            {children}
        </DataContext.Provider>
    )
}

