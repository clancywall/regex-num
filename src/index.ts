import { getIntDec, prepareRegExp } from './helpers';
import { dgt, dgte, dlt, dlte, igt, igte, ilt, ilte } from './util';

const anyF = '\\d+(\\.\\d+)?';
const tD = '(\\.\\d+)?';

/**
 * Generates Regex that matches any string number greater than or equal to the input number
 * @param num the input number
 * @returns a regular expression
 */
export const gte = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`${anyF}|-(${lte(num * -1).source})`);

    const n = getIntDec(num);
    return n.dec > 0
        ? prepareRegExp(`${igte(n.int)}\\.${dgte(n.dec)})|(${igt(n.int)}${tD}`)
        : prepareRegExp(`${igte(n.int)}${tD}`);
};

/**
 * Generates Regex that matches any string number greater than the input number
 * @param num the input number
 * @returns a regular expression
 */
export const gt = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`${anyF}|-(${lt(num * -1).source})`);

    const n = getIntDec(num);
    return prepareRegExp(`${igte(n.int)}\\.${dgt(n.dec)})|(${igt(n.int)}${tD}`);
};

/**
 * Generates Regex that matches any string number less than or equal to the input number
 * @param num the input number
 * @returns a regular expression
 */
export const lte = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`-(${gte(num * -1).source})`);

    if (num === 0) return prepareRegExp(`-${anyF}|0(\\.0+)?`);
    const n = getIntDec(num);
    return n.int > 0
        ? prepareRegExp(
              `-${anyF}|${ilte(n.int)}(\\.${dlte(n.dec)})?)|(${ilt(
                  n.int,
              )}${tD}`,
          )
        : prepareRegExp(`-${anyF}|${ilte(n.int)}(\\.${dlte(n.dec)})?`);
};

/**
 * Generates Regex that matches any string number less than the input number
 * @param num the input number
 * @returns a regular expression
 */
export const lt = (num: number): RegExp => {
    if (num < 0) return prepareRegExp(`-(${gt(num * -1).source})`);
    if (num === 0) return prepareRegExp(`-${anyF}`);
    const n = getIntDec(num);
    if (n.int > 0 && n.dec > 0)
        return prepareRegExp(
            `-${anyF}|(${ilte(n.int)}\\.${dlt(n.dec)})|(${ilt(
                n.int,
            )}${tD})|(${ilte(n.int)}(\\.0+)?)`,
        );
    else if (n.int > 0) return prepareRegExp(`-${anyF}|${ilt(n.int)}${tD}`);
    else return prepareRegExp(`-${anyF}|0(\\.${dlt(n.dec)})?`);
};
