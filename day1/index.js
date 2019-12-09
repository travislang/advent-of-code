const { numbers } = require('./day1input')

const calcFuel = (mass, totalFuel = 0) => {
    let fuelReq = Math.floor(mass / 3) - 2

    if (fuelReq < 0) return totalFuel

    return calcFuel(fuelReq, totalFuel + fuelReq)
}

exports.run = () => {
    const reducedMassTotal = numbers.reduce((accum, curr) => (accum += calcFuel(curr)), 0)

    console.log('The sum of fuel requirements is - ', reducedMassTotal)
}