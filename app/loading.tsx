import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center items-center p-2 m-1'>
        <Loader className='w-12 h-12 animate-spin' />
    </div>
  )
}

export default Loading