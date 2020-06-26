import {ObservableStore} from "./store";

const store = new ObservableStore({
    user: 'nathan',
    isAuthenticated: false
})

store.selectState('user').subscribe(console.log)

store.updateState({
    user: 'joe'
})

store.updateState({
    isAuthenticated: true
})