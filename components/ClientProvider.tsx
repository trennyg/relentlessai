'use client'

import { useState, useEffect } from 'react'
import Loader from './Loader'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // If loader has already run (e.g. HMR reload), skip it
    if (document.body.classList.contains('loader-complete')) {
      setLoaded(true)
    }
  }, [])

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        {children}
      </div>
    </>
  )
}
