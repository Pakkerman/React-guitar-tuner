declare module 'ml5' {
  interface PitchDetection {
    getPitch(callback: (err: any, frequency: number) => void): void
    setInput(input: any): void
    setCallback(callback: (pitch: number) => void): void
    stop(): void
  }

  function pitchDetection(
    model: string,
    AudioContext: any,
    MediaStream: any,
    callback: () => void
  ): PitchDetection
}
