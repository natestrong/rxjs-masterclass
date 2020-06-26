import {BehaviorSubject, Subject} from "rxjs";

const loading$ = new BehaviorSubject<boolean>(true)

export const loadingService = {
    showLoading: () => loading$.next(true),
    hideLoading: () => loading$.next(false),
    loadingStatus$: loading$.asObservable()
}