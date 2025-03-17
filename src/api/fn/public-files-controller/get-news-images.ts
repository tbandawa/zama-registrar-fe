/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ImageDto } from '../../models/image-dto';

export interface GetNewsImages$Params {
  id: number;
}

export function getNewsImages(http: HttpClient, rootUrl: string, params: GetNewsImages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ImageDto>>> {
  const rb = new RequestBuilder(rootUrl, getNewsImages.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ImageDto>>;
    })
  );
}

getNewsImages.PATH = '/skyzmetro/api/v1/files/images/news/{id}';
