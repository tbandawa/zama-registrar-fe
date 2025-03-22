import { Injectable, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LoadingService } from 'src/app/utils/loading.service'
import { ToastService } from 'src/app/modules/toasts/toast.service'
import { PagedMembersDto, MemberDto, ExportDto } from 'src/api/models'
import { RegistrarControllerService } from 'src/api/services'
import { AuthService } from 'src/app/utils/auth.service'

@Injectable({ providedIn: 'root' })
export class MembersService implements OnInit {

    private _printedMembers$ = new BehaviorSubject<ExportDto | null>(null)
    private _pagedMembers$ = new BehaviorSubject<PagedMembersDto | null>(null)
    private _memberDto$ = new BehaviorSubject<MemberDto | null>(null)

    constructor(
        private authService: AuthService,
        private toastService: ToastService,
        private loadingService: LoadingService,
        private registrarControllerService: RegistrarControllerService
    ) { }

    ngOnInit(): void {
        this.getPagedMembers()
    }

    getPagedMembers(page: number = 1) {
        this.registrarControllerService.getMembers({ page: page }).subscribe({
            next: res => {
                this._pagedMembers$.next(res)
                this.dismissError()
            }
        })
    }

    getMember(id: number) {
        this.registrarControllerService.getMember({ id: id }).subscribe({
            next: res => {
                this._memberDto$.next(res)
                this.dismissError()
            }
        })
    }

    activateMember(id: number, isActive: boolean) {
        this.registrarControllerService.activateMember({ id: id, isActive: isActive }).subscribe({
            next: res => {
                this._memberDto$.next(res)
                this.dismissError()
            }
        })
    }

    printMembers(
        members: Array<number>
    ) {
        if (members.length > 0) {
            this.registrarControllerService.printMembers({ members: members }).subscribe({
                next: res => {
                    this._printedMembers$.next(res)
                    this.dismissError()
                }
            })
        } else {
            this.toastService.show("No members selected", {
                classname: 'bg-warning text-light',
                delay: 2000,
                autohide: true
            })
        }
    }

    resetPrint() {
        this._printedMembers$.next(null)
    }

    dismissError() {
        this.loadingService.setError(null)
    }

    get isAdmin$() {
        return this.authService.isAdmin()
    }

    get printedMembers$() {
        return this._printedMembers$.asObservable()
    }

    get pagedMembers$() {
        return this._pagedMembers$.asObservable()
    }

    get member$() {
        return this._memberDto$.asObservable()
    }

    get errorResponse$() {
        return this.loadingService.errorResponse.asObservable()
    }

    get isLoading$() {
        return this.loadingService.isLoading.asObservable()
    }
}