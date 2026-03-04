// utils/instaCache.js
import { useState, useEffect } from 'react'

const CACHE_TTL = 1000 * 60 * 30  // 30 minutes — matches the Socials SaaS cache TTL
const CACHE_KEY = 'instagramFeedCache'

async function fetchInstagramFeed() {
  const res = await fetch('/api/instagram')
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || `Instagram fetch failed (${res.status})`)
  }
  const data = await res.json()
  return data.media || []
}

export function useInstagramFeed() {
  const [feed, setFeed] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (raw) {
          const { timestamp, data } = JSON.parse(raw)
          if (Date.now() - timestamp < CACHE_TTL) {
            setFeed(data)
            return
          }
        }

        const fresh = await fetchInstagramFeed()
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: fresh })
        )
        if (isMounted) setFeed(fresh)
      } catch (err) {
        if (isMounted) setError(err)
      }
    }

    load()
    return () => { isMounted = false }
  }, [])

  return { feed, error }
}
