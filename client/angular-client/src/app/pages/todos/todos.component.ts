import {Component, OnInit} from '@angular/core'
import {ActionsSubject, select, Store} from '@ngrx/store'
import {editSuccess, fetch, fetchSuccess, markExecutedSuccess, markStaredSuccess} from '../../actions/todos.actions'
import {Todo} from '../../shared/interfaces'
import {NotifierService} from 'angular-notifier'
import {ofType} from '@ngrx/effects'
import * as fromTodo from '../../selectors/todo.selector'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  loading = true
  isSearch
  todos$
  todos: Todo[]

  constructor(private store: Store<{ todo }>,
              private actionsSubj: ActionsSubject,
              private notifier: NotifierService) {
    this.todos$ = store.pipe(select(fromTodo.selectTodos))
    this.todos$.subscribe(data => {
      this.isSearch = data.isSearch
      this.todos = this.isSearch ? data.searchTodos : data.todos
    })
    actionsSubj.pipe(
      ofType(fetchSuccess)
    ).subscribe(() => {
      this.loading = false
    })
    actionsSubj.pipe(
      ofType(markExecutedSuccess)
    ).subscribe(() => {
      this.notifier.notify('success', 'Executed complete')
    })
    actionsSubj.pipe(
      ofType(markStaredSuccess)
    ).subscribe(() => {
      this.notifier.notify('success', 'Stared complete')
    })
    actionsSubj.pipe(
      ofType(editSuccess)
    ).subscribe(() => {
      this.notifier.notify('success', 'Edit complete')
    })
  }

  ngOnInit(): void {
    this.store.dispatch(fetch())
  }

}
