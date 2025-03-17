import { Injectable, OnInit } from '@angular/core'
import { LoadingService } from 'src/app/utils/loading.service'
import { ToastService } from 'src/app/modules/toasts/toast.service'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from 'src/app/utils/auth.service'
import { ProvinceDto, UserDto } from 'src/api/models'
import { ProvinceControllerService, UserControllerService } from 'src/api/services'

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnInit {

    private _districts$ = new BehaviorSubject<ProvinceDto[] | null>(null)
    private _userProfile$ = new BehaviorSubject<UserDto | null>(null)

    constructor(
        private toastService: ToastService,
        private loadingService: LoadingService,
        private authService: AuthService,
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

    getUserProfile() {
        this.userControllerService.getProfile({id: this.authService.userData.userId}).subscribe({
            next: res => {
                this.dismissError()
                this._userProfile$.next(res)
            }
        })
    }

    updateProfile(user: any) {
        this.userControllerService.editProfile({ body: user }).subscribe({
            next: res => {
                this._userProfile$.next(res)
                this.authService.updateStorage(res.token, res)
                this.dismissError()
                this.toastService.show('Profile Updated', {
                    classname: 'bg-success text-light',
                    delay: 2000,
                    autohide: true
                })
            }
        })
    }

    dismissError() {
        this.loadingService.setError(null)
    }

    get districts$() {
        return this._districts$.asObservable()
    }

    get userProfile$() {
        return this._userProfile$.asObservable()
    }

    get errorResponse$() {
        return this.loadingService.errorResponse.asObservable()
    }

    get isLoading$() {
        return this.loadingService.isLoading.asObservable()
    }
}