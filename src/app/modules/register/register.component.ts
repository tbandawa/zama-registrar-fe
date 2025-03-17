import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/utils/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.isLoggedIn()
  }

  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    terms: new FormControl(false)
  })

  registerUser() {

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
