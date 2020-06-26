import {BehaviorSubject} from "rxjs";

const subject = new BehaviorSubject('Hello')

const sub1 = subject.subscribe(value => console.log('next', value))
const sub2 = subject.subscribe(value => console.log('next2', value))

subject.next('World')

setTimeout(() => subject.subscribe(value => console.log('next3', value)), 3000)