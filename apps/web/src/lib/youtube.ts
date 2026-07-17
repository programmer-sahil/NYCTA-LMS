const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/

function normaliseUrl(value: string) {
  const trimmed = value.trim()
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function extractYouTubeVideoId(value: string | null | undefined) {
  if (!value) return null

  try {
    const url = new URL(normaliseUrl(value))
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
    let candidate: string | null = null

    if (hostname === 'youtu.be') {
      candidate = url.pathname.split('/').filter(Boolean)[0] ?? null
    } else if (
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtube-nocookie.com' ||
      hostname.endsWith('.youtube-nocookie.com')
    ) {
      if (url.pathname === '/watch') {
        candidate = url.searchParams.get('v')
      } else {
        const segments = url.pathname.split('/').filter(Boolean)
        if (['embed', 'shorts', 'live'].includes(segments[0] ?? '')) {
          candidate = segments[1] ?? null
        }
      }
    }

    return candidate && youtubeIdPattern.test(candidate) ? candidate : null
  } catch {
    return null
  }
}

export function createPrivacyEnhancedEmbedUrl(
  videoId: string,
  autoplayMuted = false,
) {
  if (!youtubeIdPattern.test(videoId)) return null

  const parameters = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  })

  if (autoplayMuted) {
    parameters.set('autoplay', '1')
    parameters.set('mute', '1')
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${parameters.toString()}`
}

export function createYouTubeWatchUrl(videoId: string) {
  return youtubeIdPattern.test(videoId)
    ? `https://www.youtube.com/watch?v=${videoId}`
    : null
}
