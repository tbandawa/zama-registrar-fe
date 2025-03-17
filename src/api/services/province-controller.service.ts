/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getProvinces } from '../fn/province-controller/get-provinces';
import { GetProvinces$Params } from '../fn/province-controller/get-provinces';
import { ProvinceDto } from '../models/province-dto';

@Injectable({ providedIn: 'root' })
export class ProvinceControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProvinces()` */
  static readonly GetProvincesPath = '/zama/api/v1/registrar/provinces';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProvinces()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvinces$Response(params?: GetProvinces$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProvinceDto>>> {
    return getProvinces(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProvinces$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProvinces(params?: GetProvinces$Params, context?: HttpContext): Observable<Array<ProvinceDto>> {
    return this.getProvinces$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProvinceDto>>): Array<ProvinceDto> => r.body)
    );
  }

}
