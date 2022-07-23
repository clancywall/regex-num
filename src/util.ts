export const gte = (num: number): RegExp => {
    const n = getIntDec(num)
    return n.dec > 0
        ? prepareRegExp(
              num,
              `${igte(n.int)}\\.${dgte(n.dec)})|(${igt(n.int)}(\\.\\d+)?`,
          )
        : prepareRegExp(num, `${igte(n.int)}(\\.\\d+)?`)
}

export const gt = (num: number): RegExp => {
    const n = getIntDec(num)
    return prepareRegExp(
        num,
        `${igte(n.int)}\\.${dgt(n.dec)})|(${igt(n.int)}(\\.\\d+)?`,
    )
}

export const lte = (num: number): RegExp => {
    if (num === 0) return prepareRegExp(num, '0(\\.0*)?')
    const n = getIntDec(num)
    return n.int > 0
        ? prepareRegExp(
              num,
              `${ilte(n.int)}(\\.${dlte(n.dec)})?)|(${ilt(n.int)}(\\.\\d+)?`,
          )
        : prepareRegExp(num, `${ilte(n.int)}(\\.${dlte(n.dec)})?`)
}

export const lt = (num: number): RegExp => {
    if (num === 0) return prepareRegExp(num, '0(\\.0*)?')
    const n = getIntDec(num)
    if (n.int > 0 && n.dec > 0)
        return prepareRegExp(
            num,
            `(${ilte(n.int)}\\.${dlt(n.dec)})|(${ilt(n.int)}(\\.\\d+)?)|(${ilte(
                n.int,
            )}(\\.0+)?)`,
        )
    else if (n.int > 0) return prepareRegExp(num, `${ilt(n.int)}(\\.\\d+)?`)
    else return prepareRegExp(num, `0(\\.${dlt(n.dec)})?`)
}

const prepareRegExp = (num: number, reg: string, collapse = true): RegExp => {
    try {
        if (collapse === true) reg = collapseRegExpString(reg)
        return new RegExp(`(${reg})`)
    } catch (err) {
        console.log(num + ' ' + reg)
        throw err
    }
}

// This is a pretty dirty way of cleaning up the regex, needs work.
const collapseRegExpString = (reg: string): string => {
    reg = reg.replaceAll('\\d{0}', '').replaceAll('[0-9]', '\\d')
    for (let i = 0; i < 10; i++) {
        reg = reg.replaceAll(`[${i}-${i}]`, `${i}`)
    }
    for (let i = 16; i > 2; i--) {
        let s = ''
        for (let j = 0; j < i; j++) s += '\\d'
        reg = reg.replaceAll(s, `\\d{${i}}`)
    }
    return reg
}

const getIntDec = (num: number): { int: number; dec: number } => {
    const strNum = num.toString().split('.')
    return {
        int: Number(strNum[0]),
        dec: strNum.length > 1 ? Number('0.' + strNum[1]) : 0.0,
    }
}

const toDigits = (num: number): number[] => {
    return num
        .toLocaleString('en-US', {
            useGrouping: false,
            maximumFractionDigits: 16,
        })
        .replace('0.', '')
        .split('')
        .map((num) => {
            return Number(num)
        })
}

const igte = (num: number): string => {
    let n = toDigits(num)
    let reg = `[1-9]\\d{${n.length},}|`
    n.forEach((d) => {
        reg += `[${d}-9]`
    })
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] < 9) {
            reg += '|'
            for (let j = 0; j <= i; j++) {
                reg += `[${j === i ? n[j] + 1 : n[j]}-9]`
            }
            reg += `\\d{${n.length - (i + 1)}}`
        }
    }
    return `(${reg})`
}

const igt = (num: number): string => {
    return igte(num + 1)
}

const ilte = (num: number): string => {
    if (num === 0) return '0'
    let n = toDigits(num)
    let reg = `\\d{0,${n.length - 1}}|`
    n.forEach((d) => {
        reg += `[0-${d}]`
    })
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] > 0) {
            reg += '|'
            for (let j = 0; j <= i; j++) {
                reg += `[0-${j === i ? n[j] - 1 : n[j]}]`
            }
            reg += `\\d{${n.length - (i + 1)}}`
        }
    }
    return `(${reg})`
}

const ilt = (num: number): string => {
    return num > 0 ? ilte(num - 1) : '0'
}

const dgte = (num: number): string => {
    let n = toDigits(num)
    return dgtProcess(n)
}

const dgtProcess = (n: number[]): string => {
    let reg = ''
    n.forEach((d) => {
        reg += `[${d}-9]`
    })
    reg += '\\d*'
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] < 9) {
            reg += '|'
            for (let j = 0; j <= i; j++) {
                reg += `[${j === i ? n[j] + 1 : n[j]}-9]`
            }
            reg += `\\d*`
        }
    }
    return `(${reg})`
}

const dgt = (num: number): string => {
    if (num === 0) return '\\d*[1-9]\\d*'
    let n = toDigits(num)
    while (n.length < 16) {
        n.push(0)
    }
    for (let i = 15; i > 0; i--) {
        if (n[i] < 9) {
            n[i]++
            break
        } else {
            n[i] = 0
        }
    }
    return dgtProcess(n)
}

const dlte = (num: number): string => {
    let n = toDigits(num)
    return dltProcess(n)
}

const dltProcess = (n: number[]): string => {
    let leadingZeros = 0
    for (let i = 0; i < n.length; i++) {
        if (n[i] === 0) leadingZeros++
        else break
    }
    if (leadingZeros === n.length) return '(0*)'
    let reg = `0{1,}|0{${leadingZeros}}`
    for (let i = leadingZeros; i < n.length; i++) {
        reg += `[0-${n[i]}]`
    }
    reg += '0*'
    reg += `|0{${leadingZeros}}(`
    for (let i = n.length; i > leadingZeros; i--) {
        for (let j = leadingZeros; j < i - 1; j++) reg += `[0-${n[j]}]`
        if (n[i - 1] > 1) reg += `([0-${n[i - 1] - 1}]\\d*)?`
        else if (n[i - 1] === 1) reg += `(0\\d*)?`
        else reg += '0*'
        if (i - 1 > leadingZeros) reg += '|'
    }
    reg += ')'
    return `(${reg})`
}

const dlt = (num: number): string => {
    if (num === 0) return '0*'
    let n = toDigits(num)
    while (n.length < 16) {
        n.push(0)
    }
    for (let i = 15; i >= 0; i--) {
        if (n[i] > 0) {
            n[i]--
            break
        } else {
            n[i] = 9
        }
    }
    return dltProcess(n)
}
