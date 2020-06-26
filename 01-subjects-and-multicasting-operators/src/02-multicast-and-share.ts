import {ConnectableObservable, interval, Observer, Subject} from "rxjs";
import {multicast, refCount, share, tap} from "rxjs/operators";

export {}

const observer: Observer<any> = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

// const interval$ = interval(1000).pipe(
//     tap(value => console.log('new interval', value)),
//     multicast(() => new Subject()),
//     refCount()
// )

const interval$ = interval(1000).pipe(
    tap(value => console.log('new interval', value)),
    share()
)

const sub1 = interval$.subscribe(observer)
const sub2 = interval$.subscribe(observer)

setTimeout(() => {
    sub1.unsubscribe()
    sub2.unsubscribe()
}, 4100)