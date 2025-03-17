/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExportDto } from '../../models/export-dto';

export interface PrintMembers$Params {
  members: Array<number>;
}

export function printMembers(http: HttpClient, rootUrl: string, params: PrintMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<ExportDto>> {
  const rb = new RequestBuilder(rootUrl, printMembers.PATH, 'post');
  if (params) {
    rb.query('members', params.members, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ExportDto>;
    })
  );
}

printMembers.PATH = '/zama/api/v1/registrar/print';
