import { toDigits } from './helpers';

/**
 * Generates a regex string that matches integers greater than or equal to the input number.
 * @param num an integer
 * @returns >= Regex
 */
export const igte = (num: number): string => {
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
export const igt = (num: number): string => {
    return igte(num + 1);
};

/**
 * Generates a regex string that matches integers less than or equal to the input number.
 * @param num an integer
 * @returns <= Regex
 */
export const ilte = (num: number): string => {
    if (num === 0) return '0';
    let n = toDigits(num);
    let reg = n.length > 1 ? `\\d{1,${n.length - 1}}|` : '';
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
export const ilt = (num: number): string => {
    return num > 0 ? ilte(num - 1) : '0';
};

/**
 * Generates a regex string that matches decimals greater than or equal to the input number.
 * @param num a decimal
 * @returns >= Regex
 */
export const dgte = (num: number): string => {
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
export const dgt = (num: number): string => {
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
export const dlte = (num: number): string => {
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
export const dlt = (num: number): string => {
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
