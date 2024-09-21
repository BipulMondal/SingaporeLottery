import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import Login from '../Auth/Login';


function Layout(props) {
    const [isOpen, setIsOpen] = useState(true)
    let tokenndata = localStorage.getItem('token')
    if (!tokenndata)
        return <Login />
    return (
        <div className="dark:bg-meta-4 dark:text-white ">
            <div className="flex h-screen overflow-hidden">
                <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full">
                    <Header setIsOpen={setIsOpen} isOpen={isOpen} />
                    <main className='pt-12'>
                        <div className="mx-auto  max-w-screen-2xl  md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>

    )
}

export default Layout;