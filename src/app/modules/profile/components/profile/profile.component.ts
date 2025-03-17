import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileService } from '../../services/profile.service'
import { AuthService } from 'src/app/utils/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userRoles = []
  isActive = 1

  profileForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    district: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profileService.getUserProfile()
    this.profileService.getDistricts()
    this.userProfile.subscribe({
      next: val => {
        if (val) {
          this.userRoles = val.role
          this.isActive = val.isActive
          this.profileForm.setValue(
            {
              firstname: val.firstname,
              lastname: val.lastname,
              email: val.email,
              district: val.district,
              password: ''
            }
          )
          this.profileForm.controls['district'].setValue(val.district, {onlySelf: true});
        }
      }
    })
  }

  saveChanges() {
    this.profileService.updateProfile(
      {
        userId: this.authService.userData.userId,
        firstname: this.profileForm.controls.firstname.value,
        lastname: this.profileForm.controls.lastname.value,
        role: this.userRoles,
        email: this.profileForm.controls.email.value,
        district: this.profileForm.controls.district.value,
        password: this.profileForm.controls.password.value,
        isActive: this.isActive
      }
    )
  }

  dismissError() {
    this.profileService.dismissError()
  }

  get districts() {
    return this.profileService.districts$
  }

  get userProfile() {
    return this.profileService.userProfile$
  }

  get errorResponse() {
    return this.profileService.errorResponse$
  }

  get loadingVisibile() {
    return this.profileService.isLoading$;
  }
}