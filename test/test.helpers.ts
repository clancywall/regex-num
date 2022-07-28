import { gt, gte, lte, lt } from '../src/index';

export const runAll = (
    type: string,
    max: number,
    min: number,
    increment: number,
) => {
    for (let i = min, n1 = 0; n1 < max; i++) {
        n1 = i * increment;
        const reg = getRegExp(type, n1);
        for (let j = min, n2 = 0; n2 < max; j++) {
            n2 = j * increment;
            check(type, reg, n1, n2);
        }
    }
};

export const runRandoms = (
    type: string,
    iterations: number,
    ints: number,
    decimals: number,
) => {
    const f1 = Math.pow(10, ints);
    const d1 = Math.pow(10, decimals);
    const f2 = Math.pow(10, ints + 1);
    const d2 = Math.pow(10, decimals + 1);
    const f3 = Math.pow(10, ints + 1);
    const d3 = Math.pow(10, decimals + 1);
    for (let i = 0; i < iterations; i++) {
        const n1 = Math.round(Math.random() * f1 * d1) / d1;
        const n2 = Math.round(Math.random() * f1 * d1) / d1;
        const n3 = Math.round(Math.random() * f2 * d2) / d2;
        const n4 = Math.round(Math.random() * f3 * d3) / d3;
        const reg = getRegExp(type, n1);
        check(type, reg, n1, n2);
        check(type, reg, n1, n3);
        check(type, reg, n1, n4);
    }
};

const numToString = (num: number): string => {
    return num.toLocaleString('en-US', {
        useGrouping: false,
        maximumFractionDigits: 16,
    });
};

export const getRegExp = (type: string, i: number) => {
    let reg: RegExp = /''/;
    switch (type.toLowerCase()) {
        case 'gte':
            reg = new RegExp(`^(${gte(i).source})$`);
            break;
        case 'gt':
            reg = new RegExp(`^(${gt(i).source})$`);
            break;
        case 'lte':
            reg = new RegExp(`^(${lte(i).source})$`);
            break;
        case 'lt':
            reg = new RegExp(`^(${lt(i).source})$`);
            break;
        default:
            throw new Error(`Comparison Type '${type}' not implemented`);
    }
    return reg;
};

export const check = (type: string, reg: RegExp, i: number, j: number) => {
    expect(reg.test('')).toBeFalsy(); //empty string check
    try {
        switch (type.toLowerCase()) {
            case 'gte':
                checkgte(reg, i, j);
                break;
            case 'gt':
                checkgt(reg, i, j);
                break;
            case 'lte':
                checklte(reg, i, j);
                break;
            case 'lt':
                checklt(reg, i, j);
                break;
            default:
                throw new Error(`Comparison Type '${type}' not implemented`);
        }
    } catch (err) {
        console.log(`${i},${j},${reg}`);
        throw err;
    }
};

export const checkgte = (reg: RegExp, i: number, j: number) => {
    expect(reg.test(numToString(i))).toBeTruthy();
    if (i === j) expect(reg.test(numToString(j))).toBeTruthy();
    else if (i > j) {
        expect(reg.test(numToString(j))).toBeFalsy();
    } else {
        expect(reg.test(numToString(j))).toBeTruthy();
    }
};

export const checkgt = (reg: RegExp, i: number, j: number) => {
    expect(reg.test(numToString(i))).toBeFalsy();
    if (i === j) expect(reg.test(numToString(j))).toBeFalsy();
    else if (i > j) {
        expect(reg.test(numToString(j))).toBeFalsy();
    } else {
        expect(reg.test(numToString(j))).toBeTruthy();
    }
};

export const checklte = (reg: RegExp, i: number, j: number) => {
    expect(reg.test(numToString(i))).toBeTruthy();
    if (i === j) expect(reg.test(numToString(j))).toBeTruthy();
    else if (j < i) {
        expect(reg.test(numToString(j))).toBeTruthy();
    } else {
        expect(reg.test(numToString(j))).toBeFalsy();
    }
};

export const checklt = (reg: RegExp, i: number, j: number) => {
    expect(reg.test(numToString(i))).toBeFalsy();
    if (i === j) expect(reg.test(numToString(j))).toBeFalsy();
    else if (j < i) {
        expect(reg.test(numToString(j))).toBeTruthy();
    } else {
        expect(reg.test(numToString(j))).toBeFalsy();
    }
};
