// declare module 'ml5' {
//   interface PitchDetection {
//     pitchDetection(
//       url: URL,
//       AudioContext: AudioContext,
//       MicStream: MediaDevices,
//       modelLoaded: void
//     ): void
//   }

//   function imageClassifier(
//     ModelUrl: URL,
//     audioContext: audioContext,
//     MediaStream: MediaDevices,
//     callback: () => void
//   ): PitchDetection
// }

declare module 'ml5' {
  interface PitchDetection {
    getPitch(callback: (err: any, frequency: number) => void): void
    setInput(input: any): void
    setCallback(callback: (pitch: number) => void): void
    stop(): void
  }

  function pitchDetection(
    model: string,
    AudioContext: AudioContext,
    MediaStream: MediaStream,
    callback: () => void
  ): PitchDetection
}
