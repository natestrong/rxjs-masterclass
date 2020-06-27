import {asapScheduler, asyncScheduler, range} from "rxjs";

export {}

asyncScheduler.schedule(() => {
    console.log('asyncScheduler')
})

// The asapScheduler will be logged before the asyncScheduler
asapScheduler.schedule(() => {
    console.log('asapScheduler')
})

// Because asapScheduler and queueMicrotask both add to the microtask queue, this will log after the asapScheduler
queueMicrotask(() => console.log('from microtask'))

// A promise also uses the microtask queue, so this will log after the above two functions.
Promise.resolve('from promise').then(console.log)

// Since this is the only synchronous log, this will appear first.
console.log('synchronous console.log')


export class AsapScheduler {
    constructor() {
        const counterElem: HTMLHeadingElement = document.getElementById('counter') as HTMLHeadingElement

        // // No Scheduler - Does not update UI until finished
        // range(1, 100000).subscribe(val => {
        //     counterElem.innerHTML = val.toString()
        // })

        // // asapScheduler - Does not update UI until finished
        // range(1, 100000, asapScheduler).subscribe(val => {
        //     counterElem.innerHTML = val.toString()
        // })

        // asyncScheduler - Updates the UI for each value of range observable
        range(1, 100000, asyncScheduler).subscribe(val => {
            counterElem.innerHTML = val.toString()
        })
    }
}