import {Component} from '@angular/core'
import {ActionsSubject, select, Store} from '@ngrx/store'
import {editSuccess, search} from '../../actions/todos.actions'
import {ofType} from '@ngrx/effects'
import * as fromTodo from '../../selectors/todo.selector'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  isSearch
  text
  todos$

  constructor(private store: Store<{ todo }>,
              private actionSubj: ActionsSubject) {
    this.todos$ = store.pipe(select(fromTodo.selectTodos))
    this.todos$.subscribe(data => {
      this.isSearch = data.isSearch
    })
    actionSubj.pipe(
      ofType(editSuccess)
    ).subscribe(() => {
      this.store.dispatch(search({text: this.text}))
    })
  }

  changeHandler(text) {
    this.store.dispatch(search({text}))
  }

}
