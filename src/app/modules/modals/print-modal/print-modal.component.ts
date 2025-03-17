import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { MemberDto } from 'src/api/models'
import { MembersService } from '../../members/services/members.service'

@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.scss']
})
export class PrintModalComponent implements OnInit {

  @Input() printedMembers: MemberDto[] = []
  @Input() exportFile: string = ""

  constructor(
    public activeModal: NgbActiveModal,
    public membersService: MembersService
  ) { }

  ngOnInit(): void { }

  downloadClick() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden')
    link.href = location.protocol + '//' + location.hostname + ':9001/' + this.exportFile
    link.download = 'zama_members.xlsx'
    document.body.appendChild(link);
    link.click()
    link.remove()
    this.membersService.resetPrint()
    this.activeModal.dismiss('Close click')
    this.activeModal.close()
  }
}
