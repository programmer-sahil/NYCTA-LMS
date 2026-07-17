'use client'

import { ExternalLink, PlayCircle, VideoOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  createPrivacyEnhancedEmbedUrl,
  createYouTubeWatchUrl,
  extractYouTubeVideoId,
} from '@/lib/youtube'

interface LessonVideoProps {
  youtubeUrl: string | null
  title: string
  autoplayMuted?: boolean
}

export function LessonVideo({
  youtubeUrl,
  title,
  autoplayMuted = false,
}: LessonVideoProps) {
  const videoId = extractYouTubeVideoId(youtubeUrl)
  const [isPlaying, setIsPlaying] = useState(autoplayMuted && videoId !== null)
  const embedUrl = videoId
    ? createPrivacyEnhancedEmbedUrl(videoId, autoplayMuted || isPlaying)
    : null
  const watchUrl = videoId ? createYouTubeWatchUrl(videoId) : null

  return (
    <section aria-labelledby="lesson-video-title">
      <Card className="overflow-hidden border-border/80 bg-card/65 shadow-none">
        <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/35">
          {isPlaying && embedUrl ? (
            <iframe
              className="absolute inset-0 size-full border-0"
              src={embedUrl}
              title={`${title} video lesson`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="grid size-full place-items-center p-6 text-center">
              <div>
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                  {videoId ? (
                    <PlayCircle className="size-7" aria-hidden="true" />
                  ) : (
                    <VideoOff className="size-7" aria-hidden="true" />
                  )}
                </span>
                <p className="mt-3 text-sm text-muted-foreground">
                  {videoId
                    ? 'Start the privacy-enhanced YouTube player when you are ready.'
                    : 'Lesson video will be added by the instructor.'}
                </p>
              </div>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle id="lesson-video-title">Video lesson</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={!videoId}
            onClick={() => setIsPlaying(true)}
          >
            <PlayCircle data-icon="inline-start" aria-hidden="true" />
            Play Lesson
          </Button>
          {watchUrl ? (
            <Button asChild variant="outline">
              <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                Open on YouTube
                <ExternalLink data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}
