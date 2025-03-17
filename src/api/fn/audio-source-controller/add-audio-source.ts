/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AudioSourceDto } from '../../models/audio-source-dto';

export interface AddAudioSource$Params {
      body: AudioSourceDto
}

export function addAudioSource(http: HttpClient, rootUrl: string, params: AddAudioSource$Params, context?: HttpContext): Observable<StrictHttpResponse<AudioSourceDto>> {
  const rb = new RequestBuilder(rootUrl, addAudioSource.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AudioSourceDto>;
    })
  );
}

addAudioSource.PATH = '/skyzmetro/api/v1/audiosource';
