// utils/useInstagramCache.js
import { useState, useEffect } from 'react'

const CACHE_TTL = 1000 * 60 * 5   // 5 minutes
const CACHE_KEY = 'instagramFeedCache'

async function fetchInstagramFeed() {
  const res = await fetch(`/api/instagram`)
  if (!res.ok) throw new Error('Instagram fetch failed')
  // assume the API returns an **array** of posts, not {data:…}
  return res.json()
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
        // if your API returned a wrapper, you’d do fresh.data; here it’s the array itself
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: fresh })
        )
        if (isMounted) setFeed(fresh)
      } catch (err) {
        console.error(err)
        if (isMounted) setError(err)
      }
    }

    load()
    return () => { isMounted = false }
  }, [])

  return { feed, error }
}
