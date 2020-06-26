import {asyncScheduler, Observer, of} from "rxjs";
import {observeOn, subscribeOn, tap} from "rxjs/operators";

const observer: Observer<any> = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

// // work, delay?, state?
// const sub = asyncScheduler.schedule(
//     console.log,
//     1000,
//     'Hello World'
// )
// console.log('sync')

// // Using the asyncScheduler as an argument for of()
// of(4, 5, 6, asyncScheduler).subscribe(observer)
// of(1, 2, 3).subscribe(observer)

// // making of asynchronous via pipe operator 'observeOn'.
// // Can also delay in the observeOn operator, but generally should do this with the delay operator.
// of(4, 5, 6).pipe(
//     tap(val => console.log('from tap', val)),
//     observeOn(asyncScheduler, 3000)
// ).subscribe(observer)
// of(1, 2, 3).subscribe(observer)

// Can also influence when the subscription to the observable occurs via subscribeOn operator.
of(4, 5, 6).pipe(
    tap(val => console.log('from tap', val)),
    subscribeOn(asyncScheduler, 3000),
).subscribe(console.log)


