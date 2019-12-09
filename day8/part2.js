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
    let processedImage = imageLayers[imageLayers.length - 1]

    // loop through layers from back to front
    for (let i = imageLayers.length - 2; i > -1; i--) {
        // loop through rows
        for (let j = 0; j < imageLayers[i].length; j++) {
            // loop through numbers of row
            for (let n = 0; n < imageLayers[i][j].length; n++) {
                //black
                if (imageLayers[i][j][n] === 0) {
                    processedImage[j][n] = imageLayers[i][j][n]
                    // white
                } else if (imageLayers[i][j][n] === 1) {
                    processedImage[j][n] = imageLayers[i][j][n]
                    // transparent
                } else {
                    // dont overwrite
                }
            }
        }
    }
    console.log("processed image -- change 1's to colored x's", processedImage)
    return 'complete'
}


exports.imageDecoder = imageDecoder
exports.processImage = processImage
