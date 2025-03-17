/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetAudio$Params {
  podecastId: number;
  episodeId: number;
}

export function getAudio(http: HttpClient, rootUrl: string, params: GetAudio$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getAudio.PATH, 'get');
  if (params) {
    rb.path('podecastId', params.podecastId, {});
    rb.path('episodeId', params.episodeId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

getAudio.PATH = '/skyzmetro/api/v1/files/audio/{podecastId}/{episodeId}';
