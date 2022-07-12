import { gte } from "../src/util";

test('check gte integers', () => {
    for (let i = 0; i < 1000; i++) {
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
    for (let j = 1; j < 1000; j++) {
        const i = j/1000;
        const reg = new RegExp(`^(${gte(i).source})$`);
        try {
            expect(reg.test(i.toString())).toBeTruthy();
            expect(reg.test((i-(1/1000)).toString())).toBeFalsy();
            expect(reg.test((i+(1/1000)).toString())).toBeTruthy();
        } catch (err) {
            console.log(i + ' ' + reg);
            throw (err);
        }
    }
});