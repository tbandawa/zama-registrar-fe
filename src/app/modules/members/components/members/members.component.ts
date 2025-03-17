import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { MembersService } from '../../services/members.service'
import { MembersTableComponent } from '../../containers/members-table/members-table.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { PrintModalComponent } from 'src/app/modules/modals/print-modal/print-modal.component'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {

  @ViewChild(MembersTableComponent) members: MembersTableComponent

  constructor(
    private membersService: MembersService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void { 
    this.membersService.printedMembers$.subscribe(
      res => {
        if (res) {
          if (res.members && res.members.length > 0) {
            const modalRef = this.modalService.open(PrintModalComponent, { centered: true, size: 'xl', backdrop: false })
            modalRef.componentInstance.printedMembers = res.members
            modalRef.componentInstance.exportFile = res.file
            modalRef.result.then(() => {
              this.membersService.resetPrint()
            }).catch((_error) => {
              this.membersService.resetPrint()
            })
          }
        }
      }
    )
  }

  printMembers() {
    let memberIds = this.members.selectedMembers.map((member => member.id))
    this.membersService.printMembers(memberIds)
  }

  dismissError() {
    this.membersService.dismissError()
  }

  get errorResponse() {
    return this.membersService.errorResponse$
  }

  get loadingVisibile() {
    return this.membersService.isLoading$;
  }
}