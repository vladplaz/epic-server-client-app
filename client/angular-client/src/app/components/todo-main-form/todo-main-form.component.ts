import {Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {add} from '../../actions/todos.actions'

@Component({
  selector: 'app-todo-main-form',
  templateUrl: './todo-main-form.component.html',
  styleUrls: ['./todo-main-form.component.css']
})
export class TodoMainFormComponent {

  isSearch
  todo = {
    stared: false,
    text: ''
  }

  constructor(private store: Store) {

  }

  submitHandler(e) {
    if(e.key === 'Enter') {
      if(this.todo.text.trim()) {
        this.store.dispatch(add({...this.todo, parent: null}))
        this.todo.stared = false
        this.todo.text = ''
      }
    }
  }

  starHandler() {
    this.todo.stared = !this.todo.stared
  }

}
