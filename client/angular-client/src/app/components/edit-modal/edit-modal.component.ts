import {
  AfterViewInit, Component, ElementRef, Input,
  Output, ViewChild, EventEmitter, OnInit
} from '@angular/core'
import MaterializeService, {MaterialInstance} from '../../shared/classes/MaterializeService'

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements AfterViewInit, OnInit {

  @Input('todoText') todoText
  @Output() onEditFinish = new EventEmitter()
  @ViewChild('input') input: ElementRef
  @ViewChild('modalRef') modalRef: ElementRef
  modal: MaterialInstance
  text

  onFinishCancel() {
    this.onEditFinish.emit({
      status: 'cancel'
    })
    this.modal.close()
  }

  onFinishConfirm() {
    if(this.text.trim()) {
      this.onEditFinish.emit({
        status: 'ok',
        text: this.text
      })
      this.modal.close()
    }
  }

  keyHandler(e) {
    if(e.key === 'Enter') {
      this.onFinishConfirm()
    }
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus()
    this.modal = MaterializeService.initModal(this.modalRef)
    this.modal.open()
  }

  ngOnInit(): void {
    this.text = this.todoText
  }

}
