export const gte = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = num - int;
    return (dec > 0) 
        ? new RegExp(`(${igte(int)}\\.${dgte(dec)})|(${igt(int)}(\\.\\d+)?)`)
        : new RegExp(`${igte(int)}(\\.\\d+)?`);
}

export const gt = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return new RegExp(`(${igte(int)}\.${dgt(dec)})|(${igt(int)}(.\\d+)?)`);
}

export const lte = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return new RegExp(`(${ilte(int)}\.${dlte(dec)})|(${ilt(int)}(.\\d+)?)`);
}

export const lt = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return (dec > 0) 
        ? new RegExp(`(${ilte(int)}\.${dlt(dec)})|(${ilt(int)}(.\\d+)?)`)
        : new RegExp(`${ilt(int)}(.\\d+)?`);
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
    return dgte(num) + '[1-9]';
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