/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PagedPodcastsDto } from '../../models/paged-podcasts-dto';

export interface GetPodcasts$Params {
  page: number;
}

export function getPodcasts(http: HttpClient, rootUrl: string, params: GetPodcasts$Params, context?: HttpContext): Observable<StrictHttpResponse<PagedPodcastsDto>> {
  const rb = new RequestBuilder(rootUrl, getPodcasts.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagedPodcastsDto>;
    })
  );
}

getPodcasts.PATH = '/skyzmetro/api/v1/podcast';
