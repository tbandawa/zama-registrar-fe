/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MemberDto } from '../../models/member-dto';

export interface ActivateMember$Params {
  id: number;
  isActive: boolean;
}

export function activateMember(http: HttpClient, rootUrl: string, params: ActivateMember$Params, context?: HttpContext): Observable<StrictHttpResponse<MemberDto>> {
  const rb = new RequestBuilder(rootUrl, activateMember.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('isActive', params.isActive, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MemberDto>;
    })
  );
}

activateMember.PATH = '/zama/api/v1/registrar/activate/{id}';
