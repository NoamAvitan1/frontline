import React from 'react'
import { CiSearch } from "react-icons/ci";


export default function Search() {
  return (
    <div className='bg-white border border-gray-700 flex items-center mx-auto rounded-md gap-2 w-[300px]'> 
      <CiSearch className='ml-2' />
      <input className="bg-transparent text-gray-900 text-sm outline-none p-3" placeholder='Search' type="text" />
    </div>
  )
}
