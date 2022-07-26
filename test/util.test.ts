import { check, getRegExp, runAll, runRandoms } from './test.helpers';
['gte', 'gt', 'lte', 'lt'].forEach((type) => {
    test(`check ${type} integers`, () => {
        console.log(`check ${type} integers`);
        runAll(type, 100, -100, 1);
    });

    test(`check ${type} decimals`, () => {
        console.log(`check ${type} decimals`);
        runAll(type, 1, -1, 0.01);
    });

    test(`check ${type} floats`, () => {
        console.log(`check ${type} floats`);
        runAll(type, 10, -10, 0.1);
    });

    test(`check ${type} randoms to 8 significant figures`, () => {
        console.log(`check ${type} randoms to 8 significant figures`);
        runRandoms(type, 1000, 4, 4);
    });

    test(`check ${type} randoms to 16 significant figures`, () => {
        console.log(`check ${type} randoms to 16 significant figures`);
        runRandoms(type, 1000, 8, 8);
    });

    test(`check ${type} randoms to 30 significant figures`, () => {
        console.log(`check ${type} randoms to 30 significant figures`);
        runRandoms(type, 1000, 15, 15);
    });

    test(`check ${type} no trailing decimal points are accepted`, () => {
        console.log(`check ${type} no trailing decimal points are accepted`);
        try {
            expect(getRegExp(type, 0).test('0.')).toBeFalsy();
            expect(getRegExp(type, 1).test('1.')).toBeFalsy();
        } catch (err) {
            console.log(getRegExp(type, 0));
            console.log(getRegExp(type, 1));
            throw err;
        }
    });
});

test(`check one number`, () => {
    const type = 'lt';
    const i = 1;
    const j = 1;
    const reg = getRegExp(type, i);
    console.log(reg);
    check(type, reg, i, j);
});
