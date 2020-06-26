import {AsyncSubject, Observer} from "rxjs";

const observer: Observer<any> = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

const subject$ = new AsyncSubject()

subject$.subscribe(observer)
subject$.subscribe(observer)

subject$.next('Hello')
subject$.next('World')
subject$.next('I\'m alive!')

setTimeout(() => {
    subject$.complete()
}, 3000)
