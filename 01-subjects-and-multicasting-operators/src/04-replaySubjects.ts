import {Observer, ReplaySubject} from "rxjs";

const observer: Observer<any> = {
    next: val => console.log('next:', val),
    error: err => console.log('error:', err),
    complete: () => console.log('complete')
}

const subject = new ReplaySubject(2)

subject.next('Hello')
subject.next('World')
subject.next('I\'m alive')
subject.subscribe(observer)
