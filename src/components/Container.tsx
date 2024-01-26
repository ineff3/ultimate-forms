import React, { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <main className=' my-10 mx-auto max-w-[700px] w-full flex flex-col items-center'>
            {children}
        </main>
    )
}

export default Container