const { input } = require('./input')
const part1 = require('./part1')
const part2 = require('./part2')

const runPart1 = () => {
    console.log('decoding image...')
    const decodedImage = part1.imageDecoder(input)
    console.log('processing image', part1.processImage(decodedImage))
}

const runPart2 = () => {
    console.log('decoding image...')
    const decodedImage = part2.imageDecoder(input)
    console.log('image processing', part2.processImage(decodedImage))
}

exports.run = () => {
    console.log('running part 1...')
    runPart1()
    console.log('running part 2...')
    runPart2()
}