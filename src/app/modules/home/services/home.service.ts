import { Injectable, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LoadingService } from 'src/app/utils/loading.service'

@Injectable({ providedIn: 'root' })
export class HomeService {

    //private _pagedNews$ = new BehaviorSubject<PagedNewsDto | null>(null)
    //private _pagedPodcasts$ = new BehaviorSubject<PagedPodcastsDto | null>(null)
    //private _homeData$ = new BehaviorSubject<HomeDto | null>(null)

    constructor(
        private loadingService: LoadingService,
        //private newsControllerService: NewsControllerService,
        //private podcastControllerService: PodcastControllerService,
        //private homeControllerService: HomeControllerService
    ) { }

    getPagedNews(page: number = 1) {
        //this.newsControllerService.getNews({ page: page }).subscribe({
        //    next: res => {
        //        this._pagedNews$.next(res)
        //    }
        //})
    }

    getPagedPodcasts(page: number = 1) {
        //this.podcastControllerService.getPodcasts({ page: page }).subscribe({
        //    next: res => {
        //        this._pagedPodcasts$.next(res)
        //    }
        //})
    }

    getHomeData() {
        //this.homeControllerService.getHomeData().subscribe({
        //    next: res => {
        //        this._homeData$.next(res)
        //    }
        //})
    }

    dismissError() {
        this.loadingService.setError(null)
    }

    /*get pagedNews$() {
        return this._pagedNews$.asObservable()
    }

    get pagedPodcasts$() {
        return this._pagedPodcasts$.asObservable()
    }

    get homeData$() {
        return this._homeData$.asObservable()
    }*/

    get errorResponse$() {
        return this.loadingService.errorResponse.asObservable()
    }

    get isLoading$() {
        return this.loadingService.isLoading.asObservable()
    }
}