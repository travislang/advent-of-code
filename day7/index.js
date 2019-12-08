const { input } = require('./input')

const permutator = inputArr => {
    let result = []

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = [...arr]
                let next = curr.splice(i, 1)
                permute([...curr], m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result
}

const intCode = (inputArr, input, startingPointer, phaseSetting = null) => {

    let needsPhaseSetting = phaseSetting !== null ? true : false
    let pointerIncrement
    const inputCode = inputArr

    for (let i = startingPointer; i < inputCode.length; i += pointerIncrement) {
        pointerIncrement = 0
        let newPointer = null
        const initialCode = inputCode[i]
            .toString()
            .split('')
            .reverse()
            .map(n => Number(n))

        const opcode = parseInt('' + (initialCode[1] || 0) + initialCode[0], 10)

        if (opcode === 99) return { halt: true, currentPointer: i }
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
            inputCode[inputCode[i + 1]] = needsPhaseSetting ? phaseSetting : input
            if(needsPhaseSetting){
                needsPhaseSetting = false
            }
        }
        if (opcode === 04) {
            pointerIncrement = 2
            const output = initialCode[2] === 1 ? inputCode[i + 1] : inputCode[inputCode[i + 1]]

            return { halt: false, currentPointer: i + 2, output }
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
        if (newPointer) {
            pointerIncrement = 1
            i = newPointer - 1
        }
    }
}

const phaseSettingsOptions = permutator([5, 6, 7, 8, 9])

let finalOutput = 0
let finalPhaseSettings = []

const amplifierController = phaseSettings => {
    console.log('checking max thrust for phase setting', phaseSettings)
    const inputCodes = [
        {
            input: [...input],
            pointerValue: 0
        },
        {
            input: [...input],
            pointerValue: 0
        },
        {
            input: [...input],
            pointerValue: 0
        },
        {
            input: [...input],
            pointerValue: 0
        },
        {
            input: [...input],
            pointerValue: 0
        }
    ]

    let sendPhaseSetting = true

    let currentOutput = 0
    let finalPhaseOutput = false

    while (!finalPhaseOutput) {
        for (let i = 0; i < 5; i++) {

            let result =
                sendPhaseSetting === true
                    ? intCode(
                          inputCodes[i].input,
                          currentOutput,
                          inputCodes[i].pointerValue,
                          phaseSettings[i],
                          i === 0 ? true : false
                      )
                    : intCode(inputCodes[i].input, currentOutput, inputCodes[i].pointerValue)

            // inputCodes[i].inout = result.inputCode
            inputCodes[i].pointerValue = result.currentPointer

            if (!result.halt) {
                currentOutput = result.output
            } else {
                finalPhaseOutput = currentOutput
            }
        }
        sendPhaseSetting = false
    }

    if (finalPhaseOutput > finalOutput) {
        finalOutput = finalPhaseOutput
        finalPhaseSettings = phaseSettings
    }
}

const findHighestSignal = phaseSettingsOptions => {
    for (phaseSetting of phaseSettingsOptions) {
        amplifierController(phaseSetting)
    }
    return { finalOutput, finalPhaseSettings }
}

console.log('finding highest feedback loop output signal', findHighestSignal(phaseSettingsOptions))
