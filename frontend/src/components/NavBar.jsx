import React from 'react'
import Search from './Search'

export default function NavBar() {
  return (
    <header className='h-[100px] bg-slate-400 flex justify-between items-center'>
      <Search/>
    </header>
  )
}
