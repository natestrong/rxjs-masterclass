import {of} from "rxjs";
import {map, toArray} from "rxjs/operators";
import {expect} from "chai";

export {}

describe('subscribe & assert testing in RxJS', () => {
    it('should compare each emitted value', () => {
        const source$ = of(1, 2, 3)
        const final$ = source$.pipe(
            map(val => val * 10),
            toArray()
        )

        const expected = [10, 20, 30]

        final$.subscribe(val => {
            expect(val).to.eql(expected)
        })
    })
})