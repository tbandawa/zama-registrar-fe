import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'members-pagination',
  templateUrl: './members-pagination.component.html',
  styleUrls: ['./members-pagination.component.scss']
})
export class MembersPaginationComponent implements OnInit {

  page = 1

  constructor(
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.membersService.getPagedMembers()
  }

  getMembers() {
    this.membersService.getPagedMembers(this.page)
  }

  getPagedMembers(page: number) {
    this.membersService.getPagedMembers(page)
  }

  get pagedMembers() {
    return this.membersService.pagedMembers$
  }
}
