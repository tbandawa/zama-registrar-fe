/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MemberDto } from '../../models/member-dto';

export interface SearchMembers$Params {
  query: string;
}

export function searchMembers(http: HttpClient, rootUrl: string, params: SearchMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MemberDto>>> {
  const rb = new RequestBuilder(rootUrl, searchMembers.PATH, 'get');
  if (params) {
    rb.query('query', params.query, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MemberDto>>;
    })
  );
}

searchMembers.PATH = '/zama/api/v1/registrar/search';
