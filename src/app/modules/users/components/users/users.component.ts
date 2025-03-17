import { Component, OnInit } from '@angular/core'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers()
  }

  dismissError() {
    this.usersService.dismissError()
  }

  get users() {
    return this.usersService.users$
  }

  get errorResponse() {
    return this.usersService.errorResponse$
  }

  get loadingVisibile() {
    return this.usersService.isLoading$;
  }
}