import { Observable, throwError } from 'rxjs'
import { Injectable, OnInit } from '@angular/core'
import { HttpErrorResponse, HttpHeaders, HttpInterceptor, HttpResponse } from '@angular/common/http'
import { HttpRequest } from '@angular/common/http'
import { HttpHandler } from '@angular/common/http'
import { HttpEvent } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { LoadingService } from './loading.service'
import { ErrorResponse } from 'src/api/models'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    authRequest: HttpRequest<any> = null

    constructor(
        private loadingService: LoadingService,
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

        // Set loading
        this.loadingService.show()

        // Reset request
        this.authRequest = null

        // Get saved auth token
        const authToken = this.authService.userToken

        // If auth token is present, clone and add token
        // to headers
        if (authToken) {
            this.authRequest = request.clone({
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + authToken
                })
            })
        }

        // Use cloned request if not null otherwise use original
        return next.handle(this.authRequest !== null ? this.authRequest : request)
            .pipe(
                tap({
                    next: (event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            this.loadingService.hide()
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.loadingService.hide()
                    if (error.error instanceof ErrorEvent || error.status === 0) {
                        // Client side error
                        this.loadingService.setError(
                            {
                                error: 'Cleint Error',
                                messages: ['Server unreachable'],
                                status: 500,
                                timeStamp: new Date().toString()
                            }
                        )
                    } else {
                        const errorBody = error.error as ErrorResponse
                        // If authentication error logout
                        if (errorBody.status === 401 || errorBody.status === 403) {
                            this.authService.clearStorage()
                            this.router.navigate(['/login'])
                        }
                        this.loadingService.setError(errorBody)
                    }
                    return throwError(() => error)
                })
            )
    }
}