import { describe, expect, it } from 'vitest'

import { createPrivacyEnhancedEmbedUrl, extractYouTubeVideoId } from './youtube'

const videoId = 'dQw4w9WgXcQ'

describe('extractYouTubeVideoId', () => {
  it.each([
    `https://www.youtube.com/watch?v=${videoId}`,
    `https://youtu.be/${videoId}`,
    `https://www.youtube.com/embed/${videoId}`,
    `youtube.com/shorts/${videoId}`,
  ])('extracts the video id from %s', (url) => {
    expect(extractYouTubeVideoId(url)).toBe(videoId)
  })

  it('rejects invalid and non-YouTube URLs', () => {
    expect(
      extractYouTubeVideoId('https://example.com/watch?v=dQw4w9WgXcQ'),
    ).toBeNull()
    expect(extractYouTubeVideoId('not a url')).toBeNull()
    expect(extractYouTubeVideoId(null)).toBeNull()
  })

  it('creates a privacy-enhanced muted autoplay URL', () => {
    const url = createPrivacyEnhancedEmbedUrl(videoId, true)
    expect(url).toContain('youtube-nocookie.com')
    expect(url).toContain('autoplay=1')
    expect(url).toContain('mute=1')
  })
})
