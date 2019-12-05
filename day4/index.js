const numberDecreases = number => {
    let numberArr = number
        .toString()
        .split('')
        .map(n => Number(n))
    let decreases = false

    for (i in numberArr) {
        const index = Number(i)
        if (index === numberArr.length - 1) break

        if (numberArr[index] > numberArr[index + 1]) {
            decreases = true
        }
    }

    if (decreases) {
        return true
    } else {
        return false
    }
}

const calculatePasswords = (min, max) => {
    let count = 0
    for (let i = min; i < max; i++) {
        console.log('checking number', i, '----- current total - ', count)

        if (numberDecreases(i)) continue

        let numberArr = i
            .toString()
            .split('')
            .map(n => Number(n))

        let hasMatch = false
        for (idx in numberArr) {
            const index = Number(idx)
            if (numberArr[index] === numberArr[index + 1]) {
                if (
                    numberArr[index] !== numberArr[index + 2] &&
                    numberArr[index] !== numberArr[index - 1]
                ) {
                    hasMatch = true
                } 
            }
        }
        if (!hasMatch) continue

        count += 1
    }

    return count
}

console.log('The amount of different passwords is - ', calculatePasswords(271973, 785961))
