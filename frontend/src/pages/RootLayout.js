import React from 'react'
import { Outlet } from 'react-router-dom'
import Manubar from '../components/Manubar'
const RootLayout = () => {
    return (
        <>
            <Manubar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
