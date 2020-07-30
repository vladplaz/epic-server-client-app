import {
  AfterViewInit, Component,
  ElementRef, ViewChild, Input
} from '@angular/core'
import {Store} from '@ngrx/store'
import {add} from '../../actions/todos.actions'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements AfterViewInit {

  @Input('parent') parent
  @ViewChild('input') input: ElementRef
  text

  constructor(private store: Store) {
  }

  submitHandler(e) {
    if(e.key === 'Enter') {
      if(this.text.trim()) {
        this.store.dispatch(add({
          text: this.text,
          parent: this.parent,
          stared: false
        }))
      }
    }
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus()
  }

}
