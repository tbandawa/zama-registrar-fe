/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteEpisode$Params {
  podcastId: number;
  episodeId: number;
}

export function deleteEpisode(http: HttpClient, rootUrl: string, params: DeleteEpisode$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, deleteEpisode.PATH, 'delete');
  if (params) {
    rb.path('podcastId', params.podcastId, {});
    rb.path('episodeId', params.episodeId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

deleteEpisode.PATH = '/skyzmetro/api/v1/podcast/episode/{podcastId}/{episodeId}';
