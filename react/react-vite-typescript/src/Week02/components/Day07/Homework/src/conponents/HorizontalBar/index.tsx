import React from 'react'
import Search from './Search'
import LeftBarItem from './LeftBarItem'

type Props = {}

export default function HorizontalBar({}: Props) {
  return (
    <div className='flex justify-between items-center bg-zinc-100 pt-3 pb-7'>
        <Search />
        <LeftBarItem />
    </div>
  )
}