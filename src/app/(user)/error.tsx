'use client'

import React from 'react'

type PropsType = {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: PropsType) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-8 p-5 md:p-8 lg:p-14 h-[90vh]'>
      <h2 className='text-2xl font-bold'>{error.message}</h2>
      <p className='text-xl text-center font-semibold'>
        Something went wrong. Please try again later.
      </p>
      <button
        className='w-full max-w-[200px] p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-medium rounded-md text-center'
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorPage
