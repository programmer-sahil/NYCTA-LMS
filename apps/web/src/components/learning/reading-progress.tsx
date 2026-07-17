'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const nextProgress =
        scrollableHeight <= 0
          ? 100
          : Math.min(
              100,
              Math.max(0, (window.scrollY / scrollableHeight) * 100),
            )
      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] h-1 bg-transparent"
      role="progressbar"
      aria-label="Lesson reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full bg-primary transition-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
