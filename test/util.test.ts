import { gte } from "../src/util";

const depth = 10000;

test('check gte integers', () => {
    for (let i = 0; i < depth; i++) {
        const reg = new RegExp(`^(${gte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            if (i > 0) expect(reg.test((i-1).toString())).toBeFalsy();
            expect(reg.test((i+1).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('check gte decimals', () => {
    for (let j = 1; j < depth; j++) {
        const i = j/depth;
        const reg = new RegExp(`^(${gte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            expect(reg.test((i-(1/depth)).toString())).toBeFalsy();
            expect(reg.test((i+(1/depth)).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('run gte randoms', () => {
    for (let j = 0; j < depth; j++) {
        const i = Math.round(Math.random()*j*depth)/depth;
        const diff = Math.round(Math.random()*10*depth)/depth;
        const reg = new RegExp(`^(${gte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            if (i - diff > 0) expect(reg.test((i-diff).toString())).toBeFalsy();
            expect(reg.test((i+diff).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + diff + ' ' + reg);
            throw (err);
        }
    }
});