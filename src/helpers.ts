/**
 * Wrapper function for RegExp()
 * @param reg string form of regex
 * @param collapse optional, set to false if causing issues.
 * @returns string convered to regex, collapsed and wrapped in parentheses
 */
export const prepareRegExp = (reg: string, collapse = true): RegExp => {
    if (collapse === true) reg = collapseRegExpString(reg);
    return new RegExp(`(${reg})`);
};

/**
 * Collapse the generated regex string to be more readable and reduce length
 * TODO: needs improvement
 * @param reg
 * @returns collapsed string
 */
export const collapseRegExpString = (reg: string): string => {
    reg = replaceAll(replaceAll(reg, '\\d{0}', ''), '[0-9]', '\\d');
    for (let i = 0; i < 10; i++) {
        reg = replaceAll(reg, `[${i}-${i}]`, `${i}`);
    }
    for (let i = 16; i > 2; i--) {
        let s = '';
        for (let j = 0; j < i; j++) s += '\\d';
        reg = replaceAll(reg, s, `\\d{${i}}`);
    }
    return reg;
};

/**
 * Splits a number into its decimal and integer components
 * Each part is returned as a whole integer
 * @param num
 * @returns { int: number; dec: number }
 */
export const getIntDec = (num: number): { int: number; dec: number } => {
    const strNum = num.toString().split('.');
    return {
        int: Number(strNum[0]),
        dec: strNum.length > 1 ? Number('0.' + strNum[1]) : 0.0,
    };
};

/**
 * Converts a number into an array of digits
 * leading 0. of decimals is stripped
 * @param num
 * @returns array of digits
 */
export const toDigits = (num: number): number[] => {
    return num
        .toLocaleString('en-US', {
            useGrouping: false,
            maximumFractionDigits: 16,
        })
        .replace('0.', '')
        .split('')
        .map((num) => {
            return Number(num);
        });
};

// Because JS is the devil.
// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str: string, match: string, replacement: any) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}
