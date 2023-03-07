import { useEffect, useRef, useState, useContext } from 'react'
import ml5 from 'ml5'
import './App.css'
import useAudioStream from './hooks/useAudioStream'

let audioStream
const audioContext = new AudioContext()

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [frequency, setFrequency] = useState<number>(0)
  const [audioContextState, setAudioContextState] = useState(audioContext.state)
  let pitch: any

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioStream = stream

      pitch = ml5.pitchDetection('./crepe/', audioContext, audioStream, () => {
        console.log('-----MODEL LOADED-----')
        getPitch()
        setIsLoading(false)
      })
    })

    return () => {
      pitch = null
    }
  }, [])

  function getPitch() {
    pitch.getPitch((err: any, frequency: number) => {
      if (err) console.log(err)
      if (frequency) {
        setFrequency(frequency)
        console.log(frequency)
      } else {
        console.log('No pitch detected')
      }
      setTimeout(() => getPitch(), 100)
    })
  }

  async function handlePause() {
    const state = audioContext.state
    console.log('AudioContext.state ==> ', state)
    if (state == 'suspended') {
      await audioContext.resume()
      console.log('AudioContext.state ==> ', state)
      setAudioContextState(state)
      return
    }
    if (state == 'running') {
      await audioContext.suspend()
      console.log('AudioContext.state ==> ', state)
      setAudioContextState(state)
      return
    }
  }

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      <br />
      {frequency?.toFixed()}
      <br />
      <div>{getNote(frequency)}</div>
      <br />
      <button onClick={handlePause}>{audioContext.state}</button>
    </div>
  )
}

export default App

const NOTE_FREQUENCY = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440,
  466.16, 493.88,
]

// so, here a number array that represents the frequencies of notes.
// each number is the exact frequency of the note,
// What I need:
// 1. A way to pin down a range of the input frequency, and where it falls into, in other word
// where the current input is in the range of what note.
// 2. With in the range bucket, a way to calculate the drift of the input against the
// exact frequency.
// 3. Convert it into graphical UI

function getNote(frequency: number) {
  if (260 > frequency) return 'too low'
  if (261 > frequency && frequency <= 269) return 'C'
  if (269 > frequency && frequency <= 285) return 'C#'
  if (285 > frequency && frequency <= 302) return 'D'
  if (302 > frequency && frequency <= 320) return 'D#'
  if (320 > frequency && frequency <= 339) return 'E'
  if (339 > frequency && frequency <= 359) return 'F'
  if (359 > frequency && frequency <= 380) return 'G'
  if (380 > frequency && frequency <= 403) return 'G#'
  if (403 > frequency && frequency <= 427) return 'A'
  if (427 > frequency && frequency <= 453) return 'A#'
  if (453 > frequency && frequency <= 480) return 'B'
  if (frequency > 493) return '>B'
}
