/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ShowDto } from '../../models/show-dto';

export interface CreateShow$Params {
      body?: {
'showDto'?: ShowDto;
'show_images'?: Array<Blob>;
}
}

export function createShow(http: HttpClient, rootUrl: string, params?: CreateShow$Params, context?: HttpContext): Observable<StrictHttpResponse<ShowDto>> {
  const rb = new RequestBuilder(rootUrl, createShow.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ShowDto>;
    })
  );
}

createShow.PATH = '/skyzmetro/api/v1/shows';
