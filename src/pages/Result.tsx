import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../hooks/hooks'
import { DataContextType, defaultValues } from '../contexts/DataProvider'
import Container from '../components/Container'
import { BsDash } from "react-icons/bs";
import { CiFileOn } from 'react-icons/ci'
import { FileWithPath } from 'react-dropzone'
import Confetti from 'react-confetti'
import Button from '../components/Button'

const Result = () => {
    const [success, setSuccess] = useState(false)
    const { data, setValues } = useData() as DataContextType
    const navigate = useNavigate()

    // data without files
    const regularData = Object.entries(data).filter(([key, value]) => key !== 'file');

    const convertBooleanToString = (value: boolean) => {
        return value === true ? 'Yes' : 'No'
    }
    const onSubmit = () => {
        console.log(data)
        setValues(defaultValues)
        setSuccess(true)
    }
    if (success) {
        return <Confetti gravity={0.04} />
    }



    return (
        <Container>
            <div className=' flex flex-col max-w-[350px] w-full mx-auto'>
                <div className=' text-center text-lg mb-3'>Form Values</div>
                <ul className=' flex flex-col border-black rounded-md border  shadow-md'>
                    {
                        regularData.map(([key, value]) => (
                            <React.Fragment key={key}>
                                <li className='px-4 py-2.5 flex justify-between items-center' >
                                    <p>{key}</p>
                                    <p>{typeof value === 'boolean' ? convertBooleanToString(value) : value === '' ? <BsDash size={20} /> : value}</p>
                                </li>
                                <hr className=' last:border-none border-black' />
                            </React.Fragment>
                        ))
                    }
                </ul>

                {
                    data.file && data.file.length > 0 && (
                        <div className=' flex flex-col items-center'>
                            <div className=' text-center text-lg my-3'>Files</div>
                            <div>
                                {
                                    data.file.map((f: FileWithPath, index: number) => (
                                        <ul className=" flex gap-3 items-center" key={index}>
                                            <CiFileOn size={25} />
                                            <div className=" flex flex-col">
                                                <p className=" text-sm">{f.name}</p>
                                                <p className=" text-[12px] text-blurred">{f.size}</p>
                                            </div>

                                        </ul>
                                    ))
                                }
                            </div>
                        </div>

                    )
                }
                <div className=' mt-5 flex gap-3'>
                    <Button label='Submit' onClick={onSubmit} />
                    <Button label='Start Over' onClick={() => navigate('/')} />
                </div>
            </div>
        </Container>
    )
}

export default Result