import { useState, useEffect } from 'react'

export default function useAudioStream() {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
  useEffect(() => {
    getStream()
    async function getStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        setAudioStream(stream)
      } catch (err) {
        console.error(err)
      }
    }
  }, [])
  return audioStream
}
