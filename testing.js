const NOTE_FREQUENCY = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440,
  466.16, 493.88,
]

// count the cutoff point
// which is the diff / 2 + frequency

const bucketEdge = []

for (let i = 0; i < NOTE_FREQUENCY.length; i++) {
  bucketEdge.push((NOTE_FREQUENCY[i] + NOTE_FREQUENCY[i + 1]) / 2)
}
console.log('bucketEdge :>> ', bucketEdge)
