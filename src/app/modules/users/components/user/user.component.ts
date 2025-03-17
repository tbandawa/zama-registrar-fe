import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UsersService } from '../../services/users.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DeleteModalComponent } from '../../../modals/delete-modal/delete-modal.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isActive: boolean = false
  userId: number = 0

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    roles: new FormControl([], [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    isActive: new FormControl(false)
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.usersService.getUser(params['id'])
    })
    this.user.subscribe({
      next: val => {
        if (val) {
          this.isActive = val.isActive == 1? true : false
          this.userId = val.userId
          this.userForm.setValue({
            firstname: val.firstname,
            lastname: val.lastname,
            roles: val.role,
            email: val.email,
            district: val.district,
            password: '',
            isActive: val.isActive == 1 ? true : false
          })
        }
      }
    })
  }

  onStatusChange(value) {
    this.usersService.activateUser(this.userId, value)
  }

  deletUser(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, { centered: true, size: 'lg', backdrop: false })
    modalRef.componentInstance.title = "Delete This User?"
    modalRef.result.then(() => {
      this.usersService.deleteUser(id)
    }).catch((_error) => { })
  }

  updateUser() {
    this.usersService.updateUser(
      {
        userId: this.userId,
        firstname: this.userForm.controls.firstname.value,
        lastname: this.userForm.controls.lastname.value,
        role: this.userForm.controls.roles.value,
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        district: this.userForm.controls.district.value,
        isActive: this.userForm.controls.isActive.value ? 1 : 0
      }
    )
  }

  get user() {
    return this.usersService.user$
  }

  dismissError() {
    this.usersService.dismissError()
  }

  get errorResponse() {
    return this.usersService.errorResponse$
  }

  get loadingVisibile() {
    return this.usersService.isLoading$;
  }
}
