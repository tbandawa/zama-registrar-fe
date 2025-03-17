/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EpisodeDto } from '../../models/episode-dto';

export interface CreateEpisode$Params {
      body?: {
'episodeDto'?: EpisodeDto;
'episode_audio': Blob;
}
}

export function createEpisode(http: HttpClient, rootUrl: string, params?: CreateEpisode$Params, context?: HttpContext): Observable<StrictHttpResponse<EpisodeDto>> {
  const rb = new RequestBuilder(rootUrl, createEpisode.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EpisodeDto>;
    })
  );
}

createEpisode.PATH = '/skyzmetro/api/v1/podcast/episode';
