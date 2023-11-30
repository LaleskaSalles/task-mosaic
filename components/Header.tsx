'use client'
import React, { useEffect, useState } from 'react'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { HiMagnifyingGlass, HiMiniUserCircle } from 'react-icons/hi2'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'

export default function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ])
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  return (
    <header>

      <div className='flex flex-col md:flex-row justify-between items-center px-5 py-2 bg-gray-500/10 rounded-b-2xl'>

        <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-tl from-[#002D80] to-[#008000]
        rounded-md filter blur-3xl opacity-50 -z-50'>

        </div>

        <div className='flex object-contain p-3 items-center'>
          <MdOutlineTaskAlt className='text-4xl pr-1 text-[#008000] select-none' />
          <h1 className='text-2xl'>Task Mosaic</h1>
        </div>

        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
            <HiMagnifyingGlass className='text-gray-400 text-xl select-none' />
            <input
              type='text'
              placeholder='Search'
              className='flex-1 outline-none p-2'
              value={searchString} 
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type='submit' hidden>Search</button>
          </form>
          <Avatar name='Laleska Rodrigues' size='50' round color='#008000' />
        </div>

      </div>

    </header>
  )
}
