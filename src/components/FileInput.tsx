import { Control, Controller } from "react-hook-form"
import Dropzone, { FileWithPath } from 'react-dropzone'
import { CiFileOn } from "react-icons/ci";


interface Props {
    control: Control
    name: string
}

const FileInput = ({ control, name }: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => <>
                <Dropzone onDrop={field.onChange}>
                    {
                        ({ getRootProps, getInputProps }) => (
                            <div
                                className=" flex justify-center items-center border border-dashed border-gray-400 w-full h-[100px] bg-gray-100 "
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <p className=" text-center max-w-[80%] text-[12px] text-blurred">
                                    Drag 'n' drop some files here, or click to select files
                                </p>
                            </div>
                        )
                    }
                </Dropzone>

                {field.value && (
                    <ul className=" flex flex-col gap-3">
                        {
                            field.value.map((f: FileWithPath, index: number) => (
                                <ul className=" flex gap-3 items-center" key={index}>
                                    <CiFileOn size={25} />
                                    <div className=" flex flex-col">
                                        <p className=" text-sm">{f.name}</p>
                                        <p className=" text-[12px] text-blurred">{f.size}</p>
                                    </div>

                                </ul>
                            ))
                        }
                    </ul>
                )}
            </>}
        />
    )
}

export default FileInput