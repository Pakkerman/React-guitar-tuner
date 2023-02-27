import { useEffect, useState } from 'react'
import ml5 from 'ml5'

// TODO: find out how to import non typescript module into typescript,
//  otherwise it can't not deploy, or just use javascript
import './App.css'

let audioContext = new AudioContext()
let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
window.addEventListener('click', async () => {
  await audioContext.resume()
  console.log('audioContext.state :>> ', audioContext.state)
})

function App() {
  const [frequency, setFrequency] = useState<number>()
  let pitch: any

  useEffect(() => {
    pitch = ml5.pitchDetection('./crepe/', audioContext, audioStream, () => {
      console.log('loaded')
      getPitch()
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

      // getPitch()
    })
  }

  return <div className="App">{frequency}</div>
}

export default App
