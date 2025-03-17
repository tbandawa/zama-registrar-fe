import { Component, OnInit } from '@angular/core'
import { ProfileService } from '../../profile/services/profile.service'
import { AuthService } from 'src/app/utils/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.getUserProfile()
  }

  logoutClick() {
    this.authService.logoutUser()
  }

  get userProfile() {
    return this.profileService.userProfile$
  }
}