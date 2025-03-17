import { Injectable, OnInit } from '@angular/core'
import { LoadingService } from 'src/app/utils/loading.service'
import { ToastService } from 'src/app/modules/toasts/toast.service'
import { Router } from '@angular/router'
import { UserControllerService } from 'src/api/services'
import { UserDto } from 'src/api/models'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {

    jwtHelper = new JwtHelperService()

    constructor(
        private toastService: ToastService,
        private loadingService: LoadingService,
        private router: Router,
        private userControllerService: UserControllerService
    ) { }

    ngOnInit(): void { }

    isLoggedIn() {
        const authToken = this.getAuthToken()
        if (authToken) {
            this.router.navigate(['/'])
        }
    }

    loginUser(user: any, remember: boolean) {
        this.userControllerService.signInUser({ body: user }).subscribe({
            next: loginResult => {
                if (loginResult.email === user.email) {
                    this.dismissError()
                    if (remember) {
                        localStorage.setItem("auth_token", loginResult.token)
                        localStorage.setItem("user_data", JSON.stringify(loginResult))
                    } else {
                        sessionStorage.setItem("auth_token", loginResult.token)
                        sessionStorage.setItem("user_data", JSON.stringify(loginResult))
                    }
                    this.toastService.show('Log In Success', {
                        classname: 'bg-success text-light',
                        delay: 2000,
                        autohide: true
                    })
                    this.router.navigate(['/'])
                }
            }
        })
    }

    logoutUser() {
        const authToken = this.getAuthToken()
        if (authToken) {
            this.userControllerService.logoutUser({ Authorization: "Bearer " + this.getAuthToken() }).subscribe({
                next: () => {
                    this.dismissError()
                    this.clearStorage()
                },
                complete: () => {
                    this.router.navigate(['/login'])
                }
            })
        }
    }

    updateStorage(token: string, userData: UserDto) {
        if (localStorage.getItem("auth_token") && localStorage.getItem("auth_token")) {
            if (token) {
                localStorage.setItem("auth_token", token)
            }
            localStorage.setItem("user_data", JSON.stringify(userData))
        } else {
            if (token) {
                sessionStorage.setItem("auth_token", token)
            }
            sessionStorage.setItem("user_data", JSON.stringify(userData))
        }
    }

    clearStorage() {
        localStorage.removeItem("auth_token")
        sessionStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        sessionStorage.removeItem("user_data")
    }

    get userToken() {
        return this.getAuthToken()
    }

    get userData() {
        return this.getUserData()
    }

    private getUserData(): UserDto {
        const userData = localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")) : JSON.parse(sessionStorage.getItem("user_data"))
        if (userData) {
            return userData
        }
        return null
    }

    private getAuthToken(): String {
        const authToken = localStorage.getItem("auth_token") ? localStorage.getItem("auth_token") : sessionStorage.getItem("auth_token")
        if (authToken) {
            if (!this.jwtHelper.isTokenExpired(authToken)) {
                return authToken
            } else {

            }
            return authToken
        }
        return null
    }

    dismissError() {
        this.loadingService.setError(null)
    }

    get errorResponse$() {
        return this.loadingService.errorResponse.asObservable()
    }

    get isLoading$() {
        return this.loadingService.isLoading.asObservable()
    }
}