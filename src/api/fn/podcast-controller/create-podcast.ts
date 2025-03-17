/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PodcastDto } from '../../models/podcast-dto';

export interface CreatePodcast$Params {
      body?: {
'podcastDto'?: PodcastDto;
'podcast_images'?: Array<Blob>;
}
}

export function createPodcast(http: HttpClient, rootUrl: string, params?: CreatePodcast$Params, context?: HttpContext): Observable<StrictHttpResponse<PodcastDto>> {
  const rb = new RequestBuilder(rootUrl, createPodcast.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
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

createPodcast.PATH = '/skyzmetro/api/v1/podcast';
