const { numbers } = require('./day2input')

const intCode = (input, noun, verb) => {
    const inputCode = [...input]

    inputCode[1] = noun
    inputCode[2] = verb

    for (let i = 0; i < inputCode.length; i += 4) {
        if (inputCode[i] === 99) break
        if (inputCode[i] === 1) {
            inputCode[inputCode[i + 3]] = inputCode[inputCode[i + 1]] + inputCode[inputCode[i + 2]]
        }
        if (inputCode[i] === 2) {
            inputCode[inputCode[i + 3]] = inputCode[inputCode[i + 1]] * inputCode[inputCode[i + 2]]
        }
    }

    if (inputCode[0] === 19690720) return 100 * noun + verb
    if(noun < 100) {
        return intCode(input, noun + 1, verb)
    } else {
        return intCode(input, 0, verb + 1)
    }
}

exports.run = () => {
    console.log('intCode position 0 output = 19690720', intCode(numbers, 0, 0))
}