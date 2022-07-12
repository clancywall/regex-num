import { gt, gte, lte } from "../src/util";

const depth = 100;

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

test('check gte randoms', () => {
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

test('check gt integers', () => {
    for (let i = 0; i < depth; i++) {
        const reg = new RegExp(`^(${gt(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeFalsy();
            if (i > 0) expect(reg.test((i-1).toString())).toBeFalsy();
            expect(reg.test((i+1).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('check gt decimals', () => {
    for (let j = 1; j < depth; j++) {
        const i = j/depth;
        const reg = new RegExp(`^(${gt(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeFalsy();
            expect(reg.test((i-(1/depth)).toString())).toBeFalsy();
            expect(reg.test((i+(1/depth)).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('check gt randoms', () => {
    for (let j = 0; j < depth; j++) {
        const i = Math.round(Math.random()*j*depth)/depth;
        const diff = Math.round(Math.random()*10*depth)/depth;
        const reg = new RegExp(`^(${gt(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeFalsy();
            if (i - diff > 0) expect(reg.test((i-diff).toString())).toBeFalsy();
            expect(reg.test((i+diff).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + diff + ' ' + reg);
            throw (err);
        }
    }
});

test('check lte integers', () => {
    for (let i = 0; i < depth; i++) {
        const reg = new RegExp(`^(${lte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            if (i > 0) expect(reg.test((i-1).toString())).toBeTruthy();
            expect(reg.test((i+1).toString())).toBeFalsy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('check lte decimals', () => {
    for (let j = 1; j < depth; j++) {
        const i = j/depth;
        const reg = new RegExp(`^(${lte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            expect(reg.test((i-(1/depth)).toString())).toBeTruthy();
            expect(reg.test((i+(1/depth)).toString())).toBeFalsy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});

test('check lte randoms', () => {
    for (let j = 0; j < depth; j++) {
        const i = Math.round(Math.random()*j*depth)/depth;
        const diff = Math.round(Math.random()*10*depth)/depth;
        const reg = new RegExp(`^(${lte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            if (i - diff > 0) expect(reg.test((i-diff).toString())).toBeTruthy();
            expect(reg.test((i+diff).toString())).toBeFalsy();
        } catch (err) {
            console.log(i + ' ' + diff + ' ' + reg);
            throw (err);
        }
    }
});