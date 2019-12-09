const { wire1, wire2 } = require('./input')

const generateWireCoords = wirePath => {
    const coords = []

    for (let i = 0; i < wirePath.length; i++) {
        const previousCoords = coords.length > 0 ? coords[coords.length - 1] : [0, 0]

        if (wirePath[i].includes('R')) {
            const splitArr = wirePath[i].split('R')
            for (let i = 0; i < Number(splitArr[1]); i++) {
                coords.push([previousCoords[0] + (i + 1), previousCoords[1]])
            }
            continue
        } else if (wirePath[i].includes('D')) {
            const splitArr = wirePath[i].split('D')
            for (let i = 0; i < Number(splitArr[1]); i++) {
                coords.push([previousCoords[0], previousCoords[1] + (i + 1)])
            }
            continue
        } else if (wirePath[i].includes('L')) {
            const splitArr = wirePath[i].split('L')
            for (let i = 0; i < Number(splitArr[1]); i++) {
                coords.push([previousCoords[0] - (i + 1), previousCoords[1]])
            }
            continue
        } else if (wirePath[i].includes('U')) {
            const splitArr = wirePath[i].split('U')
            for (let i = 0; i < Number(splitArr[1]); i++) {
                coords.push([previousCoords[0], previousCoords[1] - (i + 1)])
            }
            continue
        }
    }

    return coords
}

const findClosestIntersection = (wire1, wire2) => {
    const wire1Coords = generateWireCoords(wire1)
    const wire2Coords = generateWireCoords(wire2)

    console.log('wire coordinates', wire1Coords, wire2Coords)

    let intersectDistance = null

    for (wire1Coord of wire1Coords) {
        console.log('checking wire coord ', wire1Coord)
        for (wire2Coord of wire2Coords) {
            if (wire2Coord[0] === wire1Coord[0] && wire2Coord[1] === wire1Coord[1]) {
                const distance = Math.abs(wire1Coord[0]) + Math.abs(wire1Coord[1])
                if (!intersectDistance || distance < intersectDistance) {
                    intersectDistance = distance
                }
            }
        }
    }

    return intersectDistance
}

const findQuickestIntersection = (wire1, wire2) => {
    const wire1Coords = generateWireCoords(wire1)
    const wire2Coords = generateWireCoords(wire2)

    console.log('wire coordinates', wire1Coords, wire2Coords)

    let intersectionSteps = null

    for (wire1Coord of wire1Coords) {
        console.log('checking wire coord ', wire1Coord)
        for (wire2Coord of wire2Coords) {
            if (wire2Coord[0] === wire1Coord[0] && wire2Coord[1] === wire1Coord[1]) {
                const totalStep1 = wire1Coords.findIndex(
                    coord => coord[0] === wire1Coord[0] && coord[1] === wire1Coord[1]
                )
                const totalStep2 = wire2Coords.findIndex(
                    coord => coord[0] === wire2Coord[0] && coord[1] === wire2Coord[1]
                )

                const steps = totalStep1 + totalStep2 + 2
                if (!intersectionSteps || steps < intersectionSteps) {
                    intersectionSteps = steps
                }
            }
        }
    }

    return intersectionSteps
}

exports.run = () => {
    // console.log('The closest intersection is - ', findClosestIntersection(wire1, wire2))
    console.log('The quickest intersection is - ', findQuickestIntersection(wire1, wire2))
}
