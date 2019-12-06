const orbitValues = new Map()

const updateOrbits = orbitKey => {
    for (orbPair of orbitValues) {
        if (orbPair[1].orbitingValue === orbitKey) {
            const orbitingObj = orbitValues.get(orbitKey)

            orbitValues.set(orbPair[0], {
                orbitingValue: orbPair[1].orbitingValue,
                orbits: orbitingObj ? orbitingObj.orbits + 1 : orbPair[1].orbits + 1
            })
            updateOrbits(orbPair[0])
        }
    }
}

const calcMinOrbits = orbits => {
    const orbitPairs = orbits.map(orbitPair => orbitPair.split(')'))

    for (orbitPair of orbitPairs) {
        const orbitingObj = orbitValues.get(orbitPair[0])

        orbitValues.set(orbitPair[1], {
            orbitingValue: orbitPair[0],
            orbits: orbitingObj ? orbitingObj.orbits + 1 : 1
        })
        updateOrbits(orbitPair[1])
    }

    let currentSantaOrbit = orbitValues.get('SAN')
    let currentYouOrbit = orbitValues.get('YOU')

    let foundJoin = currentSantaOrbit.orbitingValue === currentYouOrbit.orbitingValue

    while (!foundJoin) {
        console.log(currentSantaOrbit, currentYouOrbit, foundJoin)
        const nextYouOrbit = orbitValues.get(currentYouOrbit.orbitingValue)

        if (nextYouOrbit.orbitingValue === 'COM') {
            currentYouOrbit = orbitValues.get('YOU')
            currentSantaOrbit = orbitValues.get(currentSantaOrbit.orbitingValue)
        } else {
            currentYouOrbit = nextYouOrbit
            if(nextYouOrbit.orbitingValue === currentSantaOrbit.orbitingValue){
                foundJoin = orbitValues.get(nextYouOrbit.orbitingValue)
                currentSantaOrbit = orbitValues.get('SAN')
                currentYouOrbit = orbitValues.get('YOU')
            }
        }
    }

    const totalSantaOrbits = currentSantaOrbit.orbits - 1
    const totalYouOrbits = currentYouOrbit.orbits - 1

    console.log('found join', foundJoin, totalSantaOrbits, totalYouOrbits)

    return totalSantaOrbits - foundJoin.orbits + (totalYouOrbits - foundJoin.orbits)
}

exports.calcMinOrbits = calcMinOrbits
