const anyF = '\\d+(\\.\\d+)?';
const tD = '(\\.\\d+)?';

/**
 * Generates Regex that matches any string number greater than or equal to the input number
 * @param num the input number
 * @returns a regular expression
 */
export const gte = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`${anyF}|-(${lte(num * -1).source})`);

    const n = getIntDec(num);
    return n.dec > 0
        ? prepareRegExp(`${igte(n.int)}\\.${dgte(n.dec)})|(${igt(n.int)}${tD}`)
        : prepareRegExp(`${igte(n.int)}${tD}`);
};

/**
 * Generates Regex that matches any string number greater than the input number
 * @param num the input number
 * @returns a regular expression
 */
export const gt = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`${anyF}|-(${lt(num * -1).source})`);

    const n = getIntDec(num);
    return prepareRegExp(`${igte(n.int)}\\.${dgt(n.dec)})|(${igt(n.int)}${tD}`);
};

/**
 * Generates Regex that matches any string number less than or equal to the input number
 * @param num the input number
 * @returns a regular expression
 */
export const lte = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`-(${gte(num * -1).source})`);

    if (num === 0) return prepareRegExp(`-${anyF}|0(\\.0+)?`);
    const n = getIntDec(num);
    return n.int > 0
        ? prepareRegExp(
              `-${anyF}|${ilte(n.int)}(\\.${dlte(n.dec)})?)|(${ilt(
                  n.int,
              )}${tD}`,
          )
        : prepareRegExp(`-${anyF}|${ilte(n.int)}(\\.${dlte(n.dec)})?`);
};

/**
 * Generates Regex that matches any string number less than the input number
 * @param num the input number
 * @returns a regular expression
 */
export const lt = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`-(${gt(num * -1).source})`);
    if (num === 0) return prepareRegExp(`-${anyF}`);
    const n = getIntDec(num);
    if (n.int > 0 && n.dec > 0)
        return prepareRegExp(
            `-${anyF}|(${ilte(n.int)}\\.${dlt(n.dec)})|(${ilt(
                n.int,
            )}${tD})|(${ilte(n.int)}(\\.0+)?)`,
        );
    else if (n.int > 0) return prepareRegExp(`-${anyF}|${ilt(n.int)}${tD}`);
    else return prepareRegExp(`-${anyF}|0(\\.${dlt(n.dec)})?`);
};

/**
 * Wrapper function for RegExp()
 * @param reg string form of regex
 * @param collapse optional, set to false if causing issues.
 * @returns string convered to regex, collapsed and wrapped in parentheses
 */
const prepareRegExp = (reg: string, collapse = true): RegExp => {
    if (collapse === true) reg = collapseRegExpString(reg);
    return new RegExp(`(${reg})`);
};

/**
 * Collapse the generated regex string to be more readable and reduce length
 * TODO: needs improvement
 * @param reg
 * @returns collapsed string
 */
const collapseRegExpString = (reg: string): string => {
    reg = reg.replaceAll('\\d{0}', '').replaceAll('[0-9]', '\\d');
    for (let i = 0; i < 10; i++) {
        reg = reg.replaceAll(`[${i}-${i}]`, `${i}`);
    }
    for (let i = 16; i > 2; i--) {
        let s = '';
        for (let j = 0; j < i; j++) s += '\\d';
        reg = reg.replaceAll(s, `\\d{${i}}`);
    }
    return reg;
};

/**
 * Splits a number into its decimal and integer components
 * Each part is returned as a whole integer
 * @param num
 * @returns { int: number; dec: number }
 */
const getIntDec = (num: number): { int: number; dec: number } => {
    const strNum = num.toString().split('.');
    return {
        int: Number(strNum[0]),
        dec: strNum.length > 1 ? Number('0.' + strNum[1]) : 0.0,
    };
};

/**
 * Converts a number into an array of digits
 * leading 0. of decimals is stripped
 * @param num
 * @returns array of digits
 */
const toDigits = (num: number): number[] => {
    return num
        .toLocaleString('en-US', {
            useGrouping: false,
            maximumFractionDigits: 16,
        })
        .replace('0.', '')
        .split('')
        .map((num) => {
            return Number(num);
        });
};

/**
 * Generates a regex string that matches integers greater than or equal to the input number.
 * @param num an integer
 * @returns >= Regex
 */
const igte = (num: number): string => {
    let n = toDigits(num);
    let reg = `[1-9]\\d{${n.length},}|`;
    n.forEach((d) => {
        reg += `[${d}-9]`;
    });
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] < 9) {
            reg += '|';
            for (let j = 0; j <= i; j++) {
                reg += `[${j === i ? n[j] + 1 : n[j]}-9]`;
            }
            reg += `\\d{${n.length - (i + 1)}}`;
        }
    }
    return `(${reg})`;
};

/**
 * Generates a regex string that matches integers greater than the input number.
 * @param num an integer
 * @returns > Regex
 */
const igt = (num: number): string => {
    return igte(num + 1);
};

/**
 * Generates a regex string that matches integers less than or equal to the input number.
 * @param num an integer
 * @returns <= Regex
 */
const ilte = (num: number): string => {
    if (num === 0) return '0';
    let n = toDigits(num);
    let reg = `\\d{0,${n.length - 1}}|`;
    n.forEach((d) => {
        reg += `[0-${d}]`;
    });
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] > 0) {
            reg += '|';
            for (let j = 0; j <= i; j++) {
                reg += `[0-${j === i ? n[j] - 1 : n[j]}]`;
            }
            reg += `\\d{${n.length - (i + 1)}}`;
        }
    }
    return `(${reg})`;
};

/**
 * Generates a regex string that matches integers less than the input number.
 * @param num an integer
 * @returns < Regex
 */
const ilt = (num: number): string => {
    return num > 0 ? ilte(num - 1) : '0';
};

/**
 * Generates a regex string that matches decimals greater than or equal to the input number.
 * @param num a decimal
 * @returns >= Regex
 */
const dgte = (num: number): string => {
    let n = toDigits(num);
    return dgtProcess(n);
};

/**
 * Helper function for dgte and dgt
 * @param n an array of digits
 * @returns >= Regex
 */
const dgtProcess = (n: number[]): string => {
    let reg = '';
    n.forEach((d) => {
        reg += `[${d}-9]`;
    });
    reg += '\\d*';
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] < 9) {
            reg += '|';
            for (let j = 0; j <= i; j++) {
                reg += `[${j === i ? n[j] + 1 : n[j]}-9]`;
            }
            reg += `\\d*`;
        }
    }
    return `(${reg})`;
};

/**
 * Generates a regex string that matches decimals greater than the input number.
 * @param num a decimal
 * @returns > Regex
 */
const dgt = (num: number): string => {
    if (num === 0) return '\\d*[1-9]\\d*';
    let n = toDigits(num);
    while (n.length < 16) {
        n.push(0);
    }
    for (let i = 15; i > 0; i--) {
        if (n[i] < 9) {
            n[i]++;
            break;
        } else {
            n[i] = 0;
        }
    }
    return dgtProcess(n);
};

/**
 * Generates a regex string that matches decimals less than or equal to the input number.
 * @param num a decimal
 * @returns <= Regex
 */
const dlte = (num: number): string => {
    let n = toDigits(num);
    return dltProcess(n);
};

/**
 * Helper function for dlte and dlt
 * @param n an array of digits
 * @returns <= Regex
 */
const dltProcess = (n: number[]): string => {
    let leadingZeros = 0;
    for (let i = 0; i < n.length; i++) {
        if (n[i] === 0) leadingZeros++;
        else break;
    }
    if (leadingZeros === n.length) return '(0+)';
    let reg = `0{1,}|0{${leadingZeros}}`;
    for (let i = leadingZeros; i < n.length; i++) {
        reg += `[0-${n[i]}]`;
    }
    reg += '0*';
    reg += `|0{${leadingZeros}}(`;
    for (let i = n.length; i > leadingZeros; i--) {
        for (let j = leadingZeros; j < i - 1; j++) reg += `[0-${n[j]}]`;
        if (n[i - 1] > 1) reg += `([0-${n[i - 1] - 1}]\\d*)?`;
        else if (n[i - 1] === 1) reg += `(0\\d*)?`;
        else reg += '0*';
        if (i - 1 > leadingZeros) reg += '|';
    }
    reg += ')';
    return `(${reg})`;
};

/**
 * Generates a regex string that matches decimals less than the input number.
 * @param num a decimal
 * @returns < Regex
 */
const dlt = (num: number): string => {
    if (num === 0) return '0*';
    let n = toDigits(num);
    while (n.length < 16) {
        n.push(0);
    }
    for (let i = 15; i >= 0; i--) {
        if (n[i] > 0) {
            n[i]--;
            break;
        } else {
            n[i] = 9;
        }
    }
    return dltProcess(n);
};
