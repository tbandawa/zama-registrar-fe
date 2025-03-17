import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  @Input() title

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  deleteClick() {
    this.activeModal.close()
  }
}
