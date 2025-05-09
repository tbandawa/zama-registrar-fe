/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MemberDto } from '../../models/member-dto';

export interface CreateMember$Params {
      body?: {
'memberDto'?: MemberDto;
'member_photo'?: Blob;
}
}

export function createMember(http: HttpClient, rootUrl: string, params?: CreateMember$Params, context?: HttpContext): Observable<StrictHttpResponse<MemberDto>> {
  const rb = new RequestBuilder(rootUrl, createMember.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
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

createMember.PATH = '/zama/api/v1/registrar';
