const { orbitChecksum } = require('./part1')
const { calcMinOrbits } = require('./part2')
const { input } = require('./input')


// console.log('the total orbits is ', orbitChecksum(input))
console.log('The shortest orbits to get to santa ', calcMinOrbits(input))