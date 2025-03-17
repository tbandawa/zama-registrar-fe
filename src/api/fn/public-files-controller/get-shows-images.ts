/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ImageDto } from '../../models/image-dto';

export interface GetShowsImages$Params {
  id: number;
}

export function getShowsImages(http: HttpClient, rootUrl: string, params: GetShowsImages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ImageDto>>> {
  const rb = new RequestBuilder(rootUrl, getShowsImages.PATH, 'get');
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

getShowsImages.PATH = '/skyzmetro/api/v1/files/images/shows/{id}';
