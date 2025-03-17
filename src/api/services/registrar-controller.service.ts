/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateMember } from '../fn/registrar-controller/activate-member';
import { ActivateMember$Params } from '../fn/registrar-controller/activate-member';
import { createMember } from '../fn/registrar-controller/create-member';
import { CreateMember$Params } from '../fn/registrar-controller/create-member';
import { ExportDto } from '../models/export-dto';
import { getMember } from '../fn/registrar-controller/get-member';
import { GetMember$Params } from '../fn/registrar-controller/get-member';
import { getMembers } from '../fn/registrar-controller/get-members';
import { GetMembers$Params } from '../fn/registrar-controller/get-members';
import { MemberDto } from '../models/member-dto';
import { PagedMembersDto } from '../models/paged-members-dto';
import { printMembers } from '../fn/registrar-controller/print-members';
import { PrintMembers$Params } from '../fn/registrar-controller/print-members';
import { searchMembers } from '../fn/registrar-controller/search-members';
import { SearchMembers$Params } from '../fn/registrar-controller/search-members';

@Injectable({ providedIn: 'root' })
export class RegistrarControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getMembers()` */
  static readonly GetMembersPath = '/zama/api/v1/registrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMembers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembers$Response(params: GetMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<PagedMembersDto>> {
    return getMembers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMembers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembers(params: GetMembers$Params, context?: HttpContext): Observable<PagedMembersDto> {
    return this.getMembers$Response(params, context).pipe(
      map((r: StrictHttpResponse<PagedMembersDto>): PagedMembersDto => r.body)
    );
  }

  /** Path part for operation `createMember()` */
  static readonly CreateMemberPath = '/zama/api/v1/registrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMember()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createMember$Response(params?: CreateMember$Params, context?: HttpContext): Observable<StrictHttpResponse<MemberDto>> {
    return createMember(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMember$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createMember(params?: CreateMember$Params, context?: HttpContext): Observable<MemberDto> {
    return this.createMember$Response(params, context).pipe(
      map((r: StrictHttpResponse<MemberDto>): MemberDto => r.body)
    );
  }

  /** Path part for operation `printMembers()` */
  static readonly PrintMembersPath = '/zama/api/v1/registrar/print';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `printMembers()` instead.
   *
   * This method doesn't expect any request body.
   */
  printMembers$Response(params: PrintMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<ExportDto>> {
    return printMembers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `printMembers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  printMembers(params: PrintMembers$Params, context?: HttpContext): Observable<ExportDto> {
    return this.printMembers$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExportDto>): ExportDto => r.body)
    );
  }

  /** Path part for operation `activateMember()` */
  static readonly ActivateMemberPath = '/zama/api/v1/registrar/activate/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateMember$Response(params: ActivateMember$Params, context?: HttpContext): Observable<StrictHttpResponse<MemberDto>> {
    return activateMember(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateMember(params: ActivateMember$Params, context?: HttpContext): Observable<MemberDto> {
    return this.activateMember$Response(params, context).pipe(
      map((r: StrictHttpResponse<MemberDto>): MemberDto => r.body)
    );
  }

  /** Path part for operation `getMember()` */
  static readonly GetMemberPath = '/zama/api/v1/registrar/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMember$Response(params: GetMember$Params, context?: HttpContext): Observable<StrictHttpResponse<MemberDto>> {
    return getMember(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMember(params: GetMember$Params, context?: HttpContext): Observable<MemberDto> {
    return this.getMember$Response(params, context).pipe(
      map((r: StrictHttpResponse<MemberDto>): MemberDto => r.body)
    );
  }

  /** Path part for operation `searchMembers()` */
  static readonly SearchMembersPath = '/zama/api/v1/registrar/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchMembers()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchMembers$Response(params: SearchMembers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MemberDto>>> {
    return searchMembers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchMembers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchMembers(params: SearchMembers$Params, context?: HttpContext): Observable<Array<MemberDto>> {
    return this.searchMembers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MemberDto>>): Array<MemberDto> => r.body)
    );
  }

}
