import { Component, OnInit, Output } from '@angular/core'
import { MembersService } from '../../services/members.service'
import { MemberDto } from 'src/api/models'

@Component({
  selector: 'members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss']
})
export class MembersTableComponent implements OnInit {

  selectedMembers: Array<MemberDto> = []

  constructor(
    private membersService: MembersService
  ) { }

  ngOnInit(): void { }

  get isAdmin() {
    return this.membersService.isAdmin$
  }

  get pagedMembers() {
    return this.membersService.pagedMembers$
  }
}
