import React from 'react'
import NavBar from '../conponents/NavBar'
import { Outlet } from 'react-router'

type Props = {}

export default function DefautLayout({}: Props) {
  return (
    <div className='flex'>
        <NavBar />
        <main className='text-3xl font-semibold m-5'>
            <Outlet />
        </main>
    </div>
  )
}