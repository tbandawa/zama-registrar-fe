/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ShowDto } from '../../models/show-dto';

export interface GetShow$Params {
  id: number;
}

export function getShow(http: HttpClient, rootUrl: string, params: GetShow$Params, context?: HttpContext): Observable<StrictHttpResponse<ShowDto>> {
  const rb = new RequestBuilder(rootUrl, getShow.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ShowDto>;
    })
  );
}

getShow.PATH = '/skyzmetro/api/v1/shows/{id}';
