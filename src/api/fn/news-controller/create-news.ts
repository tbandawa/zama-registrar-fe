/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewsDto } from '../../models/news-dto';

export interface CreateNews$Params {
      body?: {
'newsDto'?: NewsDto;
'news_images'?: Array<Blob>;
}
}

export function createNews(http: HttpClient, rootUrl: string, params?: CreateNews$Params, context?: HttpContext): Observable<StrictHttpResponse<NewsDto>> {
  const rb = new RequestBuilder(rootUrl, createNews.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
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

createNews.PATH = '/skyzmetro/api/v1/news';
