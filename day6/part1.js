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

const orbitChecksum = orbits => {
    const orbitPairs = orbits.map(orbitPair => orbitPair.split(')'))

    for (orbitPair of orbitPairs) {
        const orbitingObj = orbitValues.get(orbitPair[0])

        orbitValues.set(orbitPair[1], {
            orbitingValue: orbitPair[0],
            orbits: orbitingObj ? orbitingObj.orbits + 1 : 1
        })
        updateOrbits(orbitPair[1])
    }

    let totalOrbits = 0
    for (orbObj of orbitValues) {
        totalOrbits = totalOrbits + orbObj[1].orbits
    }
    return totalOrbits
}

exports.orbitChecksum = orbitChecksum


