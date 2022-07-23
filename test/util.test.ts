import { gt, gte, lte } from '../src/util'
import { check, getRegExp, runAllFromZero, runRandoms } from './test.helpers'

;['gte', 'gt', 'lte', 'lt'].forEach((type) => {
    test(`check ${type} integers`, () => {
        console.log(`check ${type} integers`)
        runAllFromZero(type, 100, 1)
    })

    test(`check ${type} decimals`, () => {
        console.log(`check ${type} decimals`)
        runAllFromZero(type, 1, 0.01)
    })

    test(`check ${type} floats`, () => {
        console.log(`check ${type} floats`)
        runAllFromZero(type, 10, 0.1)
    })

    test(`check ${type} randoms to 8 significant figures`, () => {
        console.log(`check ${type} randoms to 8 significant figures`)
        runRandoms(type, 1000, 4, 4)
    })

    test(`check ${type} randoms to 16 significant figures`, () => {
        console.log(`check ${type} randoms to 16 significant figures`)
        runRandoms(type, 1000, 8, 8)
    })

    test(`check ${type} randoms to 30 significant figures`, () => {
        console.log(`check ${type} randoms to 30 significant figures`)
        runRandoms(type, 1000, 15, 15)
    })
})

test(`check one number`, () => {
    const type = 'lt'
    const i = 1343
    const j = 1180
    const reg = getRegExp(type, i)
    check(type, reg, i, j)
})
