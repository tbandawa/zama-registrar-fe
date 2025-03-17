/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PodcastDto } from '../../models/podcast-dto';

export interface PublishPodcasts$Params {
  id: number;
  publish: boolean;
}

export function publishPodcasts(http: HttpClient, rootUrl: string, params: PublishPodcasts$Params, context?: HttpContext): Observable<StrictHttpResponse<PodcastDto>> {
  const rb = new RequestBuilder(rootUrl, publishPodcasts.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('publish', params.publish, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PodcastDto>;
    })
  );
}

publishPodcasts.PATH = '/skyzmetro/api/v1/podcast/{id}';
