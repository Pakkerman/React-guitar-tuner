import { useState } from 'react'
import ml5 from 'ml5'
import './App.css'

let audioContext = new AudioContext()
let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
const pitch = ml5.pitchDetection('./crepe/', audioContext, audioStream, () => {
  console.log('loaded')
  getPitch()
})
let output

function getPitch() {
  pitch.getPitch((err: any, frequency: any) => {
    if (err) console.log(err)
    if (frequency) {
      output = frequency
      console.log(frequency)
    } else {
      console.log('No pitch detected')
    }
    setTimeout(() => getPitch(), 333)
    // getPitch()
  })
}

window.addEventListener('click', async () => {
  await audioContext.resume()
  console.log('audioContext.state :>> ', audioContext.state)
})

function App() {
  // const [frequency, setFreqency] = useState(null)

  return (
    <div className="App">
      <p>{frequency}</p>
    </div>
  )
}

export default App
