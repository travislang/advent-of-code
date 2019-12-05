const { input } = require('./input')


const intCode = (input, testInput) => {
    console.log('running...')
    let pointerIncrement
    const inputCode = [...input]

    for (let i = 0; i < inputCode.length; i += pointerIncrement) {
        pointerIncrement = 0
        let newPointer = null
        const initialCode = inputCode[i]
            .toString()
            .split('')
            .reverse()
            .map(n => Number(n))

        const opcode = parseInt('' + (initialCode[1] || 0) + initialCode[0], 10)

        if (opcode === 99) break
        if (opcode === 01) {
            pointerIncrement = 4
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            inputCode[inputCode[i + 3]] = param1 + param2
        }
        if (opcode === 02) {
            pointerIncrement = 4
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            inputCode[inputCode[i + 3]] = param1 * param2
        }
        if (opcode === 03) {
            pointerIncrement = 2
            inputCode[inputCode[i + 1]] = testInput
        }
        if (opcode === 04) {
            pointerIncrement = 2
            const output = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            console.log('opcode 04 hit. Output value - ', output)
            if(output !== 0 && inputCode[i + 2] !== 99){
                console.log('something went wrong.  Current number is', i, 'initial value is', initialCode, 'opcode is', opcode)
            } 
            else if(inputCode[i + 2] === 99) {
                console.log('program finished running')
            }
        }
        if (opcode === 05) {
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            if (param1 !== 0) {
                newPointer = param2
            } else {
                pointerIncrement = 3
            }
        }
        if (opcode === 06) {
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            if (param1 === 0) {
                newPointer = param2
            } else {
                pointerIncrement = 3
            }
        }
        if (opcode === 07) {
            pointerIncrement = 4
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            if (param1 < param2) {
                inputCode[inputCode[i + 3]] = 1
            } else {
                inputCode[inputCode[i + 3]] = 0
            }
        }
        if (opcode === 08) {
            pointerIncrement = 4
            const param1 = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]
            const param2 = initialCode[3] === 1 ? inputCode[i + 2] : inputCode[inputCode[i + 2]]
            if (param1 === param2) {
                inputCode[inputCode[i + 3]] = 1
            } else {
                inputCode[inputCode[i + 3]] = 0
            }
        }
        if(newPointer) {
            pointerIncrement = 1
            i = newPointer - 1
        }
    }
}

console.log('running intCode program with input of 5...')
intCode(input, 5)
