import {Component, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {
  changeOpen,
  deleteTodos,
  edit,
  markExecuted,
  markStared
} from '../../actions/todos.actions'
import {Todo} from '../../shared/interfaces'
import {createIdsArray} from '../../helpers/array.helper'
import * as fromTodo from '../../selectors/todo.selector'

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

  @Input('todo') todo: Todo

  isSearch = false
  isCreating
  isEdit
  todos$

  constructor(private store: Store) {
    this.todos$ = store.pipe(select(fromTodo.selectTodos))
    this.todos$.subscribe(data => {
      this.isSearch = data.isSearch
    })
  }

  execHandler() {
    this.store.dispatch(markExecuted({
      id: this.todo.id,
      executed: !this.todo.executed
    }))
  }

  starHandler() {
    this.store.dispatch(markStared({
      id: this.todo.id,
      stared: !this.todo.stared
    }))
  }

  deleteHandler() {
    if(window.confirm('Delete this todo?')) {
      this.store.dispatch(deleteTodos({
        parent: this.todo.id,
        idsToDelete: [this.todo.id, ...createIdsArray(this.todo.todos)]
      }))
    }
  }

  openHandler() {
    this.store.dispatch(changeOpen({
      id: this.todo.id,
      isOpen: !this.todo.isOpen
    }))
  }

  createTodoHandler() {
    this.isCreating = !this.isCreating
  }

  onEditFinish(result) {
    if(result.status === 'ok') {
      this.store.dispatch(edit({
        id: this.todo.id,
        text: result.text
      }))
    }
  }

  editHandler() {
    this.isEdit = !this.isEdit
  }

}
