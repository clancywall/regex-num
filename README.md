# regex-num

Generates numerical operations in regex.

## Usage

Four Functions are currently available to match the standard number comparisons.

### `gte(number)`

Regex that matches any number >= the provided number.

E.g. `gte(1)` returns `(([1-9]\d{1,}|[1-9])(\.\d+)?)`

### `gt(number)`

Regex that matches any number > the provided number.

E.g. `gt(1)` returns `(([1-9]\d{1,}|[1-9])\.\d*[1-9]\d*)|(([1-9]\d{1,}|[2-9])(\.\d+)?)`

### `lte(number)`

Regex that matches any number <= the provided number.

E.g. `lte(1)` returns `(-\d+(\.\d+)?|([0-1])(\.(0+))?)|(0(\.\d+)?)`

### `lt(number)`

Regex that matches any number < the provided number.

E.g. `lt(1)` returns `(-\d+(\.\d+)?|0(\.\d+)?)`

## Notes

### Supported Input

All standard decimal or integer positive or negative numbers.

### Matched Number Format

Integer Numbers will be matched if they contain digits only - not separated by thousands commas, spaces etc.
E.g. `1000` will work, `1,000` will not.

Decimal components are optional in all cases and should be marked by a full stop character <`.`>, i.e. `gte(1.5)` will match `2` and will match `1.5`.

Negative numbers should be marked using the <`-`> minus character. e.g `-2.5`.

### Limitations

Numbers with > 30 significant figures, and numbers comprised of a an integer or decimal component > 15 digits are not supported. This is due to the maximum length of a standard number in JavaScript being limited to 16 integer or decimal digits and the regex conversion process requiring an extra digit.

### When would you use this?

Nine times out of ten it is better and more efficient to extract the number from the string you want to compare. Generating regex is inefficient and slow. If you understand that, and want to use regex anyway, this will help you out.
