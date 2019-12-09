const day1 = require('./day1')
const day2 = require('./day2')
const day3 = require('./day3')
const day4 = require('./day4')
const day5 = require('./day5')
const day6 = require('./day6')
const day7 = require('./day7')
const day8 = require('./day8')

const readline = require('readline')

const solutions = {
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const quitProgram = () => {
    rl.write('Quiting... \r')
    rl.close()
    process.exit(0)
}

const readUserInput = answer => {
    const isDay = /^day(?:[1-9][0-9]*){1}$/.test(answer)
    if(isDay) {
        rl.write(`Running ${answer} solution... \r`)
        solutions[answer].run()
        promptContinue()
    } else if(answer === 'all') {
        Object.keys(solutions).map(key => solutions[key].run())
    } else if(answer === 'quit' || answer === 'q') {
        quitProgram()
    } else {
        rl.write('That is not a valid day. Maybe a typo? \r')
        promptUser()
    }
}

const readUserContinue = answer => {
    if(answer === 'y' || answer === 'yes') {
        promptUser()
    } else {
        quitProgram()
    }
}

const promptContinue = () => {
    rl.question('Would you like to run another day? (y/n)', readUserContinue)
}

const promptUser = () => {
    rl.question('What day would you like to run? ', readUserInput)
}

const run = () => {
    rl.write('\r')
    rl.write('       ___________________________\r')
    rl.write('      |                           |\r')
    rl.write('      |         Travis Lang       |\r')
    rl.write('      |    Advent Of Code 2019    |\r')
    rl.write('      |___________________________|\r')
    rl.write('\r')
    promptUser()
}

run()
