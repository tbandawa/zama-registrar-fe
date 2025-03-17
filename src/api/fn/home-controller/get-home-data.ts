/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { HomeDto } from '../../models/home-dto';

export interface GetHomeData$Params {
}

export function getHomeData(http: HttpClient, rootUrl: string, params?: GetHomeData$Params, context?: HttpContext): Observable<StrictHttpResponse<HomeDto>> {
  const rb = new RequestBuilder(rootUrl, getHomeData.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<HomeDto>;
    })
  );
}

getHomeData.PATH = '/skyzmetro/api/v1/home';
