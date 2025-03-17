/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PagedMembersDto } from '../../models/paged-members-dto';

export interface GetMembers$Params {
  page: number;
}

export function getMembers(http: HttpClient, rootUrl: string, params: GetMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<PagedMembersDto>> {
  const rb = new RequestBuilder(rootUrl, getMembers.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagedMembersDto>;
    })
  );
}

getMembers.PATH = '/zama/api/v1/registrar';
