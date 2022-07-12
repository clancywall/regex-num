export const gte = (num:number):RegExp => {
    const n = getIntDec(num);
    return (n.dec > 0)
        ? new RegExp(`(${igte(n.int)}\\.${dgte(n.dec)})|(${igt(n.int)}(\\.\\d+)?)`)
        : new RegExp(`${igte(n.int)}(\\.\\d+)?`);
}

export const gt = (num:number):RegExp => {
    const n = getIntDec(num);
    return new RegExp(`(${igte(n.int)}\\.${dgt(n.dec)})|(${igt(n.int)}(.\\d+)?)`);
}

export const lte = (num:number):RegExp => {
    const n = getIntDec(num);
    return new RegExp(`(${ilte(n.int)}\\.${dlte(n.dec)})|(${ilt(n.int)}(.\\d+)?)`);
}

export const lt = (num:number):RegExp => {
    const n = getIntDec(num);
    return (n.dec > 0)
        ? new RegExp(`(${ilte(n.int)}\\.${dlt(n.dec)})|(${ilt(n.int)}(\\.\\d+)?)`)
        : new RegExp(`${ilt(n.int)}(\\.\\d+)?`);
}

const getIntDec = (num: number):{int:number, dec:number} => {
    const strNum = num.toString().split('.');
    return {
        int: Number(strNum[0]),
        dec: (strNum.length > 1) ? Number('0.'+strNum[1]) : 0.0
    }
}

const toDigits = (num:number):number[] => {
    return String(num).replace("0.",'').split("").map((num)=>{
        return Number(num)
    });
}

const igte = (num:number):string => {
    let n = toDigits(num);
    let reg = `[1-9]\\d{${n.length},}|`;
    n.forEach(d => {
        reg += `[${d}-9]`;
    });
    for (let i = 0; i < n.length-1; i++) {
        if (n[i] < 9) {
            reg += '|';
            for (let j = 0; j <= i; j++) {
                reg+=`[${(j === i) ? n[j]+1: n[j]}-9]`;
            }
            reg+=`\\d{${n.length-(i+1)}}`;
        }
    }
    return `(${reg})`;
}

const igt = (num:number):string => {
    return igte(num + 1);
}

const ilte = (num:number):string => {
    let n = toDigits(num);
    let reg = `\\d{0,${n.length-1}}|`;
    n.forEach(d => {
        reg += `[0-${d}]`;
    });
    return `(${reg})`;
}

const ilt = (num:number):string => {
    return ilte(num-1);
}

const dgte = (num:number):string => {
    let n = toDigits(num);
    let reg = '';
    n.forEach(d => {
        reg += `[${d}-9]`;
    });
    reg += '\\d*'
    for (let i = 0; i < n.length-1; i++) {
        if (n[i] < 9) {
            reg += '|';
            for (let j = 0; j <= i; j++) {
                reg+=`[${(j === i) ? n[j]+1: n[j]}-9]`;
            }
            reg+=`\\d*`;
        }
    }
    return `(${reg})`;
}

const dgt = (num:number):string=> {
    return dgte(Number(num+'1'));
}

const dlte = (num:number):string => {
    let n = toDigits(num);
    let reg = '';
    n.forEach(d => {
        reg += `[0-${d}]`;
    });
    reg += '\\d*'
    return `(${reg})`;
}

const dlt = (num:number):string => {
    return dlte(num -1);
}