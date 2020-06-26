import {BehaviorSubject, Subject} from "rxjs";
import {distinctUntilKeyChanged, pluck, scan} from "rxjs/operators";

export class ObservableStore {
    private readonly _store: BehaviorSubject<any>
    private _stateUpdates: Subject<any>;

    constructor(initialState: {}) {
        this._store = new BehaviorSubject(initialState)
        this._stateUpdates = new Subject()

        // accumulate state
        this._stateUpdates.pipe(
            scan((acc: any, curr: any) => {
                return {...acc, ...curr}
            }, initialState)
        ).subscribe(this._store)
    }

    updateState(stateUpdate: any) {
        this._stateUpdates.next(stateUpdate)
    }

    selectState(stateKey: string) {
        return this._store.pipe(
            distinctUntilKeyChanged(stateKey),
            pluck(stateKey)
        )
    }

    stateChanges() {
        return this._store.asObservable()
    }
}