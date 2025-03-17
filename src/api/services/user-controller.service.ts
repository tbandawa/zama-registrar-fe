/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateUser } from '../fn/user-controller/activate-user';
import { ActivateUser$Params } from '../fn/user-controller/activate-user';
import { addUser } from '../fn/user-controller/add-user';
import { AddUser$Params } from '../fn/user-controller/add-user';
import { createUser } from '../fn/user-controller/create-user';
import { CreateUser$Params } from '../fn/user-controller/create-user';
import { deleteUser } from '../fn/user-controller/delete-user';
import { DeleteUser$Params } from '../fn/user-controller/delete-user';
import { editProfile } from '../fn/user-controller/edit-profile';
import { EditProfile$Params } from '../fn/user-controller/edit-profile';
import { getProfile } from '../fn/user-controller/get-profile';
import { GetProfile$Params } from '../fn/user-controller/get-profile';
import { getUsers } from '../fn/user-controller/get-users';
import { GetUsers$Params } from '../fn/user-controller/get-users';
import { LogoutDto } from '../models/logout-dto';
import { logoutUser } from '../fn/user-controller/logout-user';
import { LogoutUser$Params } from '../fn/user-controller/logout-user';
import { signInUser } from '../fn/user-controller/sign-in-user';
import { SignInUser$Params } from '../fn/user-controller/sign-in-user';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editProfile()` */
  static readonly EditProfilePath = '/zama/api/v1/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProfile$Response(params: EditProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return editProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProfile(params: EditProfile$Params, context?: HttpContext): Observable<UserDto> {
    return this.editProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `addUser()` */
  static readonly AddUserPath = '/zama/api/v1/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUser$Response(params: AddUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return addUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUser(params: AddUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.addUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getProfile()` */
  static readonly GetProfilePath = '/zama/api/v1/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfile$Response(params: GetProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfile(params: GetProfile$Params, context?: HttpContext): Observable<UserDto> {
    return this.getProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `activateUser()` */
  static readonly ActivateUserPath = '/zama/api/v1/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateUser$Response(params: ActivateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return activateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateUser(params: ActivateUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.activateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/zama/api/v1/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<number> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/zama/api/v1/user/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: CreateUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `signInUser()` */
  static readonly SignInUserPath = '/zama/api/v1/auth/signin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signInUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signInUser$Response(params: SignInUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return signInUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signInUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signInUser(params: SignInUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.signInUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getUsers()` */
  static readonly GetUsersPath = '/zama/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params: GetUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params: GetUsers$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `logoutUser()` */
  static readonly LogoutUserPath = '/zama/api/v1/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logoutUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  logoutUser$Response(params: LogoutUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LogoutDto>> {
    return logoutUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logoutUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logoutUser(params: LogoutUser$Params, context?: HttpContext): Observable<LogoutDto> {
    return this.logoutUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<LogoutDto>): LogoutDto => r.body)
    );
  }

}
