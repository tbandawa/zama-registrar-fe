/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProvinceDto } from '../../models/province-dto';

export interface GetProvinces$Params {
}

export function getProvinces(http: HttpClient, rootUrl: string, params?: GetProvinces$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProvinceDto>>> {
  const rb = new RequestBuilder(rootUrl, getProvinces.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProvinceDto>>;
    })
  );
}

getProvinces.PATH = '/zama/api/v1/registrar/provinces';
