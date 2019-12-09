const day1 = require('./day1')
const day2 = require('./day2')
const day3 = require('./day3')
const day4 = require('./day4')
const day5 = require('./day5')
const day6 = require('./day6')
const day7 = require('./day7')
const day8 = require('./day8')
const day9 = require('./day9')

const solutions = {
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8,
    day9
}


const readUserInput = answer => {
    const isDay = /^day(?:[1-9][0-9]*){1}$/.test(answer)
    if(isDay) {
        console.log(`Running ${answer} solution...`)
        solutions[answer].run()
    } else if(answer === 'quit' || answer === 'q') {
        console.error(
            'Quitting...'
        )
        process.exit(0)
    } else {
        console.log(`${answer} is not a valid day. Maybe a typo?`)
    }
}


const run = () => {
    const solutionArgs = process.argv
    const solutionDays = solutionArgs.splice(2, solutionArgs.length)
    if (solutionDays.length > 0) {
        for(let day of solutionDays) {
            readUserInput(day)
        }
    } else {
        console.error('no solution day provided.  Please re run with an argument, eg. node index.js day1')
        process.exit(0)
    }
}

run()
