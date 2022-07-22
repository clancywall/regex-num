import { gt, gte, lte, lt } from "../src/util";

export const runAllFromZero = (type:string, max:number, increment:number) => {
    for (let i = 0, n1 = 0; n1 < max; i++) {
        n1 = i * increment;
        const reg = getRegExp(type, n1);
        for (let j = 0, n2 = 0; n2 < max; j++) {
            n2 = j * increment;
            try {
                check(type, reg, n1, n2);
            } catch (err) {
                console.log(`${n1},${n2},${reg}`);
                throw (err);
            }
        }
    }
}

const numToString = (num: number):string => {
    return num.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 16 });
}

export const getRegExp = (type:string, i:number) => {
    let reg:RegExp=/''/;
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
}

export const check = (type:string, reg:RegExp, i:number, j:number) => {
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
}

export const checkgte = (reg:RegExp, i:number, j:number) => {
    try {
        expect(reg.test(numToString(i))).toBeTruthy();
        if (i === j) expect(reg.test(numToString(j))).toBeTruthy();
        else if (i > j) {
            expect(reg.test(numToString(j))).toBeFalsy();
        } else {
            expect(reg.test(numToString(j))).toBeTruthy();
        }
    } catch (err) {
        console.log(`${i},${j},${reg}`);
        throw (err);
    }
}

export const checkgt = (reg:RegExp, i:number, j:number) => {
    expect(reg.test(numToString(i))).toBeFalsy();
    if (i === j) expect(reg.test(numToString(j))).toBeFalsy();
    else if (i > j) {
        expect(reg.test(numToString(j))).toBeFalsy();
    } else {
        expect(reg.test(numToString(j))).toBeTruthy();
    }
}

export const checklte = (reg:RegExp, i:number, j:number) => {
    try {
        expect(reg.test(numToString(i))).toBeTruthy();
        if (i === j) expect(reg.test(numToString(j))).toBeTruthy();
        else if (i < j) {
            expect(reg.test(numToString(j))).toBeFalsy();
        } else {
            expect(reg.test(numToString(j))).toBeTruthy();
        }
    } catch (err) {
        console.log(`${i},${j},${reg}`);
        throw (err);
    }
}

export const checklt = (reg:RegExp, i:number, j:number) => {
    try {
        expect(reg.test(numToString(i))).toBeFalsy();
        if (i === j) expect(reg.test(numToString(j))).toBeTruthy();
        else if (i < j) {
            expect(reg.test(numToString(j))).toBeFalsy();
        } else {
            expect(reg.test(numToString(j))).toBeTruthy();
        }
    } catch (err) {
        console.log(`${i},${j},${reg}`);
        throw (err);
    }
}