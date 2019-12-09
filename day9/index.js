const { input } = require('./input')

const test = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]

//[0: 109, 1: 1, 2: 204, 3: -1, 4: 1001, 5: 100, 6: 1, 7: 100, 8: 1008, ..., 100: 1, 101: 0] 
//9 - relative base = 1
//4 - output 109 (position 0)
//1 - add 0 + 1 to position 100
//8 - 0 is not equal to 16 so position 101 = 0
//6 - 0 0 new pointer = 0

const test2 = [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
const test3 = [104, 1125899906842624, 99]

const intCode = (inputArr, input, startingPointer) => {
    let pointerIncrement
    let relativeBase = 0

    const inputCode = [...inputArr]

    for (let i = startingPointer; i < inputCode.length; i += pointerIncrement) {
        pointerIncrement = 0
        let newPointer = null
        const initialCode = inputCode[i]
            .toString()
            .split('')
            .reverse()
            .map(n => Number(n))

        const opcode = parseInt('' + (initialCode[1] || 0) + initialCode[0], 10)

        const getParam = (opcodeParameter, paramNumber, setValue) => {
            if(setValue) {
                switch (opcodeParameter) {
                    case 2:
                        return relativeBase + inputCode[i + paramNumber]
                    case 1:
                        return i + paramNumber
                    case 0:
                    default:
                        return inputCode[i + paramNumber]
                }
            } else {
                switch (opcodeParameter) {
                    case 2:
                        return inputCode[relativeBase + inputCode[i + paramNumber]] || 0
                    case 1:
                        return inputCode[i + paramNumber] || 0
                    case 0:
                    default:
                        return inputCode[inputCode[i + paramNumber]] || 0
                }
            }
        }

        if (opcode === 99) return { halt: true, output: 'halted' }
        if (opcode === 01) {
            pointerIncrement = 4
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            const param3 = getParam(initialCode[4], 3, true)
            inputCode[param3] = param1 + param2
        }
        if (opcode === 02) {
            pointerIncrement = 4
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            const param3 = getParam(initialCode[4], 3, true)
            inputCode[param3] = param1 * param2
        }
        if (opcode === 03) {
            pointerIncrement = 2

            const param1 = getParam(initialCode[2], 1, true)
            inputCode[param1] = input
        }
        if (opcode === 04) {
            pointerIncrement = 2
            const output = getParam(initialCode[2], 1)
            console.log('opcode 04 hit. Output -', output)
            // return { halt: false, output }
        }
        if (opcode === 05) {
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            if (param1 !== 0) {
                newPointer = param2
            } else {
                pointerIncrement = 3
            }
        }
        if (opcode === 06) {
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            if (param1 === 0) {
                newPointer = param2
            } else {
                pointerIncrement = 3
            }
        }
        if (opcode === 07) {
            pointerIncrement = 4
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            const param3 = getParam(initialCode[4], 3, true)
            if (param1 < param2) {
                inputCode[param3] = 1
            } else {
                inputCode[param3] = 0
            }
        }
        if (opcode === 08) {
            pointerIncrement = 4
            const param1 = getParam(initialCode[2], 1)
            const param2 = getParam(initialCode[3], 2)
            const param3 = getParam(initialCode[4], 3, true)
            if (param1 === param2) {
                inputCode[param3] = 1
            } else {
                inputCode[param3] = 0
            }
        }
        if (opcode === 09) {
            pointerIncrement = 2
            const param1 = getParam(initialCode[2], 1)
            relativeBase += param1
        }
        if (newPointer !== null) {
            pointerIncrement = 1
            i = newPointer - 1
        }
    }
}

exports.run = () => {
    console.log('running int code computer...')
    const result = intCode(input, 1, 0)
    console.log('result', result.output)
    // const result1 = intCode(test, 0, 0)
    // const result2 = intCode(test2, 0, 0)
    // const result3 = intCode(test3, 0, 0)
    // console.log('result1', result1.output)
    // console.log('result2', result2.output)
    // console.log('result3', result3.output)
}
