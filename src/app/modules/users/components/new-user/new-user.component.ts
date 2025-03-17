import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsersService } from '../../services/users.service'
import { AuthService } from 'src/app/utils/auth.service'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    roles: new FormControl([], [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    isActive: new FormControl(false)
  })

  constructor(
    private usersService: UsersService,
    private authServe: AuthService
  ) { }

  ngOnInit(): void {
    this.usersService.getDistricts()
  }

  addUser() {
    this.usersService.addUser(
      {
        userId: this.authServe.userData.userId,
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

  dismissError() {
    this.usersService.dismissError()
  }

  get districts() {
    return this.usersService.districts$
  }

  get user() {
    return this.usersService.user$
  }

  get errorResponse() {
    return this.usersService.errorResponse$
  }

  get loadingVisibile() {
    return this.usersService.isLoading$;
  }
}