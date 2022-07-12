const gte = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return new RegExp(`(${igte(int)}\.${dgte(dec)})|(${igt}(.\\d+)?)`);
}

const lte = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return new RegExp(`(${ilte(int)}\.${dlte(dec)})|(${ilt}(.\\d+)?)`);
}

const lt = (num:number):RegExp => {
    const int = Math.trunc(num);
    const dec = Number(((num - int)+'').replace('0.',''));
    return (dec > 0) 
        ? new RegExp(`(${ilte(int)}\.${dlt(dec)})|(${ilt}(.\\d+)?)`)
        : new RegExp(`${ilt}(.\\d+)?`);
}

const igte = (num:number):RegExp => {
    let n = [...num.toString()];
    let reg = `\\d{${n.length+1},}|`;
    n.forEach(d => {
        reg += `[${Number(d)}-9]`;
    });
    return new RegExp(reg);
}

const igt = (num:number):RegExp => {
    return igte(num + 1);
}

const ilte = (num:number):RegExp => {
    let n = [...num.toString()];
    let reg = `\\d{0,${n.length-1}}|`;
    n.forEach(d => {
        reg += `[0-${Number(d)}]`;
    });
    return new RegExp(reg);
}

const ilt = (num:number):RegExp => {
    return ilte(num-1);
}

const dgte = (num:number):RegExp => {
    let n = [...num.toString()];
    let reg = '';
    n.forEach(d => {
        reg += `[${Number(d)}-9]`;
    });
    reg += '\\d*'
    return new RegExp(reg);
}

const dgt = (num:number):RegExp => {
    return new RegExp(dgte(num) + '[1-9]');
}

const dlte = (num:number):RegExp => {
    let n = [...num.toString()];
    let reg = '';
    n.forEach(d => {
        reg += `[0-${Number(d)}]`;
    });
    reg += '\\d*'
    return new RegExp(reg);
}

const dlt = (num:number):RegExp => {
    return dlte(num -1);
}