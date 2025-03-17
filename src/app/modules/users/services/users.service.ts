import { Injectable, OnInit } from '@angular/core'
import { LoadingService } from 'src/app/utils/loading.service'
import { ToastService } from 'src/app/modules/toasts/toast.service'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from 'src/app/utils/auth.service'
import { UserDto, RegisterDto, ProvinceDto } from 'src/api/models'
import { ProvinceControllerService, UserControllerService } from 'src/api/services'

@Injectable({ providedIn: 'root' })
export class UsersService implements OnInit {

    private _districts$ = new BehaviorSubject<ProvinceDto[] | null>(null)
    private _users$ = new BehaviorSubject<UserDto[] | null>(null)
    private _user$ = new BehaviorSubject<UserDto | null>(null)

    constructor(
        private toastService: ToastService,
        private loadingService: LoadingService,
        private authService: AuthService,
        private router: Router,
        private userControllerService: UserControllerService,
        private provinceController: ProvinceControllerService
    ) { }

    ngOnInit(): void { }

    getDistricts() {
        this.provinceController.getProvinces().subscribe({
            next: res => {
                this.dismissError
                this._districts$.next(res)
            }
        })
    }

    getUsers() {
        this.userControllerService.getUsers({id: this.authService.userData.userId}).subscribe({
            next: res => {
                this.dismissError()
                this._users$.next(res)
            }
        })
    }

    getUser(id: number) {
        this.userControllerService.getProfile({id: id}).subscribe({
            next: res => {
                this.dismissError()
                this._user$.next(res)
            }
        })
    }

    activateUser(id: number, isActive: boolean) {
        this.userControllerService.activateUser({ id: id, isActive: isActive? 1 : 0 }).subscribe({
            next: res => {
                this.toastService.show(isActive ? 'User Activated' : 'User De-Activated', {
                    classname: 'bg-success text-light',
                    delay: 2000,
                    autohide: true
                })
                this._user$.next(res)
                this.dismissError()
            }
        })
    }

    addUser(user: RegisterDto) {
        this.userControllerService.addUser({body: user}).subscribe({
            next: res => {
                this.toastService.show('User Created', {
                    classname: 'bg-success text-light',
                    delay: 2000,
                    autohide: true
                })
                this._user$.next(res)
                this.dismissError()
                this.router.navigate(['users'])
            }
        })
    }

    updateUser(user: RegisterDto) {
        this.userControllerService.editProfile({body: user}).subscribe({
            next: res => {
                this.toastService.show('User Updated', {
                    classname: 'bg-success text-light',
                    delay: 2000,
                    autohide: true
                })
                this._user$.next(res)
                this.dismissError()
            }
        })
    }

    deleteUser(id: number) {
        this.userControllerService.deleteUser({id: id}).subscribe({
            next: res => {
                this.toastService.show('User Deleted', {
                    classname: 'bg-success text-light',
                    delay: 2000,
                    autohide: true
                })
                this.dismissError()
                this.router.navigate(['users'])
            }
        })
    }

    dismissError() {
        this.loadingService.setError(null)
    }

    get districts$() {
        return this._districts$.asObservable()
    }

    get users$() {
        return this._users$.asObservable()
    }

    get user$() {
        return this._user$.asObservable()
    }

    get errorResponse$() {
        return this.loadingService.errorResponse.asObservable()
    }

    get isLoading$() {
        return this.loadingService.isLoading.asObservable()
    }
}