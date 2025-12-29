import dynamic from 'next/dynamic'
import {useMemo, useState, useEffect} from 'react'
import config from '../../sanity/sanity.config'

// Dynamically import Studio with SSR disabled
// Note: The localStorage-file warning is harmless - it's from Sanity Studio
// trying to use Node.js flags that don't apply in browser environments
const Studio = dynamic(() => import('sanity').then((mod) => mod.Studio), {
  ssr: false,
  loading: () => (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <p>Loading Sanity Studio...</p>
    </div>
  ),
})

export default function StudioPage() {
  const [corsError, setCorsError] = useState(false)
  const [currentOrigin, setCurrentOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin)
      
      // Listen for CORS errors - specifically the credentials error
      const handleError = (event) => {
        const errorMsg = event.message || event.error?.message || ''
        if (
          errorMsg.includes('CORS') || 
          errorMsg.includes('cors') || 
          errorMsg.includes('CorsOriginError') ||
          errorMsg.includes('Access-Control-Allow-Credentials') ||
          errorMsg.includes('credentials mode')
        ) {
          setCorsError(true)
        }
      }
      
      // Also check console errors
      const originalError = console.error
      console.error = (...args) => {
        const errorMsg = args.join(' ')
        if (
          errorMsg.includes('CORS') || 
          errorMsg.includes('Access-Control-Allow-Credentials') ||
          errorMsg.includes('credentials mode')
        ) {
          setCorsError(true)
        }
        originalError.apply(console, args)
      }
      
      window.addEventListener('error', handleError)
      window.addEventListener('unhandledrejection', handleError)
      
      return () => {
        window.removeEventListener('error', handleError)
        window.removeEventListener('unhandledrejection', handleError)
      }
    }
  }, [])

  // Create config with current origin for better CORS handling
  const studioConfig = useMemo(() => {
    if (typeof window === 'undefined') return config
    
    return {
      ...config,
      // Ensure API is properly configured
      api: {
        ...config.api,
        projectId: config.projectId || config.api?.projectId,
        dataset: config.dataset || config.api?.dataset,
      },
    }
  }, [])

  if (corsError) {
    return (
      <div style={{
        padding: '3rem',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{color: '#e74c3c', marginBottom: '1rem'}}>⚠️ CORS Error: Credentials Not Allowed</h1>
        <div style={{
          background: '#fff3cd',
          border: '2px solid #ffc107',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <p style={{fontWeight: 'bold', marginBottom: '0.5rem', color: '#856404'}}>
            The error shows: "Access-Control-Allow-Credentials header must be 'true'"
          </p>
          <p style={{color: '#856404', lineHeight: '1.6'}}>
            This means your origin is added, but <strong>"Allow credentials"</strong> is not enabled.
          </p>
        </div>
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <p style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Your origin (copy this exactly):</p>
          <code style={{
            background: '#fff',
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            display: 'block',
            fontSize: '1.1rem',
            color: '#e74c3c',
            border: '2px solid #e74c3c',
            fontWeight: 'bold'
          }}>
            {currentOrigin}
          </code>
        </div>
        <div style={{
          background: '#e7f3ff',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid #b3d9ff'
        }}>
          <h2 style={{marginTop: 0, color: '#004085'}}>Step-by-Step Fix:</h2>
          <ol style={{lineHeight: '2', color: '#004085'}}>
            <li>Go to <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" style={{color: '#0070f3', fontWeight: 'bold'}}>https://sanity.io/manage</a></li>
            <li>Select your project: <strong>MasdaGym</strong> (Project ID: c7pvjyjf)</li>
            <li>Click <strong>Settings</strong> (gear icon) → <strong>API</strong> → <strong>CORS origins</strong></li>
            <li>
              <strong>Find or add this origin:</strong>
              <code style={{
                background: '#fff',
                padding: '0.25rem 0.5rem',
                borderRadius: '3px',
                marginLeft: '0.5rem',
                display: 'inline-block'
              }}>{currentOrigin}</code>
            </li>
            <li>
              <strong style={{color: '#e74c3c'}}>CRITICAL:</strong> Make sure the checkbox/toggle for 
              <strong style={{color: '#e74c3c'}}> "Allow credentials"</strong> is <strong style={{color: '#e74c3c'}}>ENABLED/CHECKED</strong>
            </li>
            <li>Click <strong>"Save"</strong> or <strong>"Update"</strong></li>
            <li>Wait 10-30 seconds for changes to propagate</li>
            <li>Come back here and click the refresh button below</li>
          </ol>
        </div>
        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <strong>💡 Tip:</strong> If you already added the origin, find it in the list and make sure "Allow credentials" is checked. 
          You may need to edit the existing entry rather than adding a new one.
        </div>
        <button
          onClick={() => {
            setCorsError(false)
            window.location.reload()
          }}
          style={{
            background: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          ✅ I've Enabled "Allow Credentials" - Refresh Now
        </button>
      </div>
    )
  }

  return (
    <div style={{height: '100vh', position: 'relative'}}>
      <Studio config={studioConfig} />
    </div>
  )
}

