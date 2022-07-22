import { gt, gte, lte } from "../src/util";
import { check, getRegExp, runAllFromZero } from "./helpers";

//['gte', 'gt', 'lte', 'lt'].forEach(type => {
['gte'].forEach(type => {    
    test(`check ${type} integers`, () => {
        console.log(`check ${type} integers`);
        runAllFromZero(type, 100, 1);
    });
    
    test(`check ${type} decimals`, () => {
        console.log(`check ${type} decimals`);
        runAllFromZero(type, 1, 0.01);
    });
    
    test(`check ${type} floats`, () => {
        console.log(`check ${type} all`);
        runAllFromZero(type, 10, 0.1);
    });
});

test.skip(`check one number`, () => {
    const type = 'gt';
    const i = 0.56;
    const j = 0.56;
    const reg = getRegExp(type, i);
    console.log(reg);
    check(type, reg, i, j);
});

