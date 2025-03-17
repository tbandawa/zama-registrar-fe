import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { MembersService } from '../../services/members.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberComponent implements OnInit {

  activate: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.membersService.getMember(params['id'])
    })
    this.member.subscribe({
      next: res => {
        this.activate = res.isActive == 1 ? true : false
      }
    })
  }

  printMember(members: Array<number>) {
    this.membersService.printMembers(members)
  }

  onStatusChange(id: number, isActive: boolean) {
    this.membersService.activateMember(id, isActive)
  }

  dismissError() {
    this.membersService.dismissError()
  }

  get member() {
    return this.membersService.member$
  }

  get errorResponse() {
    return this.membersService.errorResponse$
  }

  get loadingVisibile() {
    return this.membersService.isLoading$;
  }
}