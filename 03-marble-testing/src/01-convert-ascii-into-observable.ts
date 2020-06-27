import {TestScheduler} from "rxjs/testing";
import {expect} from "chai";
import {it} from "mocha";
import {delay, map, take} from "rxjs/operators";
import {concat, from} from "rxjs";

// Testing with Chai and Mocha
// Each common test suite is contained within its own describe function block
// describe() - describe the purpose of this block.
// 2nd param is a function that contains all of our tests.
describe('Marble testing in RxJS', () => {
    let testScheduler: TestScheduler

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).to.eql(expected)
        })
    })

    // It function describes a single test
    it('should convert ASCII diagrams into observables', () => {
        // Each test runs the TestScheduler.run() method.
        // All logic for test should be placed within this function.
        // This function takes a function which contain the assertions.
        testScheduler.run(helpers => {
            // Any async operators that appear inside this method will automatically use the TestScheduler,
            // so we can write synchronous tests for previously asynchronous code.
            const {cold, expectObservable} = helpers
            const source$ = cold('--a-b---c')
            const expected = '--a-b---c'
            expectObservable(source$).toBe(expected)
        })
    })

    // Instead of just testing that the source emits a, b, c..
    // lets test that each emitted value is properly transformed by map operator
    it('should allow configuration of emitted values', () => {
        testScheduler.run(helpers => {
            const {cold, expectObservable} = helpers
            // The cold function accepts a map to substitute values
            const source$ = cold('--a-b---c', {a: 1, b: 2, c: 3})
            const final$ = source$.pipe(map(val => val * 10))
            const expected = '--a-b---c'
            expectObservable(final$).toBe(expected, {a: 10, b: 20, c: 30})
        })
    })

    // Can also test that subscriptions happens at the expected timing
    it('should let you identify subscription points', () => {
        testScheduler.run(helpers => {
            const {cold, expectObservable, expectSubscriptions} = helpers
            const source$ = cold('-a---b-|')
            const source2$ = cold('-c---d-|')
            const final$ = concat(source$, source2$)
            const expected = '-a---b--c---d-|'

            // Can also test for the subscription timing
            const source1ExpectedSub = '^------!'
            const source2ExpectedSub = '-------^------!'

            expectObservable(final$).toBe(expected)
            expectSubscriptions(source$.subscriptions).toBe(source1ExpectedSub)
            expectSubscriptions(source2$.subscriptions).toBe(source2ExpectedSub)
        })
    })

    it('should let you test hot observables', () => {
        testScheduler.run(helpers => {
            const {expectObservable, hot} = helpers
            // Use the caret ^ to signal when the subscription started
            const source$ = hot('--a-b-^-c')
            // for the expected result, can start after the caret
            const final$ = source$.pipe(take(1))
            const expected = '--(c|)'
            expectObservable(final$).toBe(expected)
        })
    })

    it('should let you test synchronous operations', () => {
        testScheduler.run(helpers => {
            const {expectObservable, hot} = helpers
            // Use the caret ^ to signal when the subscription started
            const source$ = from([1, 2, 3, 4, 5])
            const expected = '(abcde|)'
            expectObservable(source$).toBe(expected, {a: 1, b: 2, c: 3, d: 4, e: 5})
        })
    })

    it('should let you test asynchronous operations', () => {
        testScheduler.run(helpers => {
            const {expectObservable, hot} = helpers
            // Use the caret ^ to signal when the subscription started
            const source$ = from([1, 2, 3, 4, 5])
            const final$ = source$.pipe(delay(200))
            const expected = '200ms (abcde|)'
            expectObservable(final$).toBe(expected, {a: 1, b: 2, c: 3, d: 4, e: 5})
        })
    })

})