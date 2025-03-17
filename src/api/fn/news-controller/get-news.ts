/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PagedNewsDto } from '../../models/paged-news-dto';

export interface GetNews$Params {
  page: number;
}

export function getNews(http: HttpClient, rootUrl: string, params: GetNews$Params, context?: HttpContext): Observable<StrictHttpResponse<PagedNewsDto>> {
  const rb = new RequestBuilder(rootUrl, getNews.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagedNewsDto>;
    })
  );
}

getNews.PATH = '/skyzmetro/api/v1/news';
