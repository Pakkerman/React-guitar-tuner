import { useEffect, useState } from 'react'
import ml5 from 'ml5'
import './App.css'

let audioContext = new AudioContext()
let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
// const pitch = ml5.pitchDetection('./crepe/', audioContext, audioStream, () => {
//   console.log('loaded')
//   getPitch()
// })

window.addEventListener('click', async () => {
  await audioContext.resume()
  console.log('audioContext.state :>> ', audioContext.state)
})

function App() {
  const [frequency, setFrequency] = useState('waiting for frequency')
  let pitch

  useEffect(() => {
    pitch = ml5.pitchDetection('./crepe/', audioContext, audioStream, () => {
      console.log('loaded')
      getPitch()
    })
  }, [])

  function getPitch() {
    pitch.getPitch((err, frequency) => {
      if (err) console.log(err)
      if (frequency) {
        setFrequency(frequency)
        console.log(frequency)
      } else {
        console.log('No pitch detected')
      }
      setTimeout(() => getPitch(), 333)
      // getPitch()
    })
  }

  return <div className="App">{frequency}</div>
}

export default App
