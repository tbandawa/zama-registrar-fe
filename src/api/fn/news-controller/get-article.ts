/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewsDto } from '../../models/news-dto';

export interface GetArticle$Params {
  id: number;
}

export function getArticle(http: HttpClient, rootUrl: string, params: GetArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<NewsDto>> {
  const rb = new RequestBuilder(rootUrl, getArticle.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NewsDto>;
    })
  );
}

getArticle.PATH = '/skyzmetro/api/v1/news/{id}';
