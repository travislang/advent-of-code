const IMAGE_WIDTH = 25
const IMAGE_HEIGHT = 6

const imageDecoder = input => {
    let layers = []
    const inputArr = input.split('').map(n => Number(n))

    let pixel = 0
    let row = 0
    let layer = []
    for (let n of inputArr) {
        if (IMAGE_HEIGHT * IMAGE_WIDTH === pixel) {
            layers.push(layer)
            layer = []

            pixel = 0
            row = 0
        }
        if (pixel % IMAGE_WIDTH === 0) {
            layer.push([])
            row++
        }
        layer[row - 1].push(n)
        pixel++
    }
    layers.push(layer)

    return layers
}

const processImage = imageLayers => {
    let imageLayer = null
    let imageLayerZeros = null

    for(let layer of imageLayers) {
        let currentLayerZeros = 0

        for(layerRow of layer) {
            for(n of layerRow) {
                if(n === 0) {
                    currentLayerZeros++
                }
            }
        }

        if (imageLayerZeros === null || currentLayerZeros < imageLayerZeros) {
            imageLayer = layer
            imageLayerZeros = currentLayerZeros
        }
    }

    console.log('layer with lowest zeros', imageLayer, imageLayerZeros)

    let totalOnes = 0
    let totalTwos = 0

    for(let row of imageLayer) {

        for(let n of row) {
            if(n === 1) totalOnes++
            if(n === 2) totalTwos++
        }
    }

    console.log('total ones', totalOnes, 'total twos', totalTwos)

    return totalOnes * totalTwos
}

exports.imageDecoder = imageDecoder
exports.processImage = processImage
