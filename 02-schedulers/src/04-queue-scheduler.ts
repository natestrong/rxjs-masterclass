import {queueScheduler} from "rxjs";

export {}

queueScheduler.schedule(() => {
    queueScheduler.schedule(() => {
        console.log('inner queue')
    })
    console.log('first queue')
})
console.log('sync')