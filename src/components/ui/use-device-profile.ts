'use client'

import { useState, useEffect } from 'react'

interface DeviceProfile {
  isMobile: boolean
  isTablet: boolean
  isTouch: boolean
  prefersReducedMotion: boolean
}

export default function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    prefersReducedMotion: false,
  })

  useEffect(() => {
    function update() {
      const width = window.innerWidth
      setProfile({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isTouch: window.matchMedia('(pointer: coarse)').matches,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return profile
}
