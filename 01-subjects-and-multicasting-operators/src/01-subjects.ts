import {interval, Observer, pipe, Subject} from "rxjs";
import {tap} from "rxjs/operators";

export {}

const observer: Observer<any> = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

const subject = new Subject()

const subscription = subject.subscribe(observer)

const subscription2 = subject.subscribe(observer)

const interval$ = interval(2000).pipe(
    tap(value => console.log('new interval', value))
)

interval$.subscribe(subject)