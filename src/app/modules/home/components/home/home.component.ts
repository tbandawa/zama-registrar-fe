import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getPagedNews()
    this.homeService.getPagedPodcasts()
    this.homeService.getHomeData()
  }

  /*get homeData() {
    return this.homeService.homeData$
  }

  get pagedNews() {
    return this.homeService.pagedNews$
  }

  get pagedPodcasts() {
    return this.homeService.pagedPodcasts$
  }*/

  dismissError() {
    this.homeService.dismissError()
  }

  get errorResponse() {
    return this.homeService.errorResponse$
  }

  get loadingVisibile() {
    return this.homeService.isLoading$;
  }
}
