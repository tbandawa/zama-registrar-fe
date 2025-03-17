/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LogoutDto } from '../../models/logout-dto';

export interface LogoutUser$Params {
  Authorization: string;
}

export function logoutUser(http: HttpClient, rootUrl: string, params: LogoutUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LogoutDto>> {
  const rb = new RequestBuilder(rootUrl, logoutUser.PATH, 'get');
  if (params) {
    rb.header('Authorization', params.Authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LogoutDto>;
    })
  );
}

logoutUser.PATH = '/zama/api/v1/logout';
