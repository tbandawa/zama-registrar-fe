/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ShowDto } from '../../models/show-dto';

export interface GetShows$Params {
  date: string;
}

export function getShows(http: HttpClient, rootUrl: string, params: GetShows$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ShowDto>>> {
  const rb = new RequestBuilder(rootUrl, getShows.PATH, 'get');
  if (params) {
    rb.query('date', params.date, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ShowDto>>;
    })
  );
}

getShows.PATH = '/skyzmetro/api/v1/shows';
