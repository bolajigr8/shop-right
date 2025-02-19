'use client'

import { persistor, store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <Toaster
            position='bottom-right'
            toastOptions={{
              style: {
                background: '#000',
                color: '#fff',
              },
            }}
          />
          {children}
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}

export default Layout
