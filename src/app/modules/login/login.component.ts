import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { UserDto } from 'src/api/models'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/utils/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  })

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.authService.isLoggedIn()
  }

  loginUser() {
    this.authService.loginUser(
      {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      },
      this.loginForm.controls.remember.value
    )
  }

  dismissError() {
    this.authService.dismissError()
  }

  get errorResponse() {
    return this.authService.errorResponse$
  }

  get loadingVisibile() {
    return this.authService.isLoading$;
  }
}
