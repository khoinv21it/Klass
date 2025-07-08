import React from 'react'
import NavBar from '../conponents/NavBar'
import { Outlet } from 'react-router'
import HorizontalBar from '../conponents/HorizontalBar'

type Props = {}

export default function DefautLayout({}: Props) {
  return (
    <div className='flex'>
        <NavBar />
        <div className='w-full'>
          <HorizontalBar />
          <main className='text-3xl font-semibold m-5'>
            <Outlet />
        </main>
        </div>
    </div>
  )
}