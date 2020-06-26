import {ajax} from "rxjs/ajax";
import {fromEvent, Observer} from "rxjs";
import {mergeMapTo, shareReplay, tap} from "rxjs/operators";

const observer: Observer<any> = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

export class ShareReplay {
    constructor() {
        const ajax$ = ajax('https://api.github.com/users/naughtyphoton')
        const click$ = fromEvent(document, 'click')
        const clickRequest$ = click$.pipe(
            mergeMapTo(ajax$),
            shareReplay()
        )
        clickRequest$.subscribe(observer)

        setTimeout(() => {
            console.log('subscribing!')
            clickRequest$.subscribe(observer)
        }, 5000)
    }
}

