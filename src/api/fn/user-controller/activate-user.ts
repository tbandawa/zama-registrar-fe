/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDto } from '../../models/user-dto';

export interface ActivateUser$Params {
  id: number;
  isActive: number;
}

export function activateUser(http: HttpClient, rootUrl: string, params: ActivateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
  const rb = new RequestBuilder(rootUrl, activateUser.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('isActive', params.isActive, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDto>;
    })
  );
}

activateUser.PATH = '/zama/api/v1/user/{id}';
