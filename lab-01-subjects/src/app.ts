import {Subject} from "rxjs";
import {loadingService} from "./loadingService";

export {}

window.onload = () => {

    const loadingOverlay = document.getElementById('loading-overlay') as HTMLDivElement

    loadingService.loadingStatus$.subscribe(isLoading => {
        if (isLoading) {
            loadingOverlay.classList.add('open')
        } else {
            loadingOverlay.classList.remove('open')
        }
    })

    setTimeout(() => loadingService.hideLoading(), 3000)

}