import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {exhaustMap, map} from 'rxjs/operators'
import {TodoService} from '../shared/services/todo.service'
import {
  add,
  addSuccess,
  deleteTodos, deleteTodosSuccess,
  edit, editSuccess,
  fetch,
  fetchSuccess,
  markExecuted, markExecutedSuccess,
  markStared, markStaredSuccess
} from '../actions/todos.actions'
import {Todo, TodoAddData, TodoDeleteData, TodoEditData, TodoExecutedData, TodoStaredData} from '../shared/interfaces'

@Injectable({
  providedIn: 'root'
})
export class TodoEffects {

  fetch$ = createEffect(() => this.actions$
    .pipe(
      ofType(fetch),
      exhaustMap(
        () =>
          this.todoService.fetchTodos()
            .pipe(
              map((todos: Todo[]) => fetchSuccess({todos}))
            )
      )
    )
  )

  add$ = createEffect(() => this.actions$
    .pipe(
      ofType(add),
      exhaustMap(
        ((action: TodoAddData) =>
            this.todoService.addTodo(action)
              .pipe(
                map(({id}) => addSuccess({...action, id}))
              )
        )
      )
    )
  )

  deleteTodos$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteTodos),
      exhaustMap(
        ((action: TodoDeleteData) =>
            this.todoService.deleteTodo(action.idsToDelete)
              .pipe(
                map(() => deleteTodosSuccess({parent: action.parent}))
              )
        )
      )
    )
  )

  markStared$ = createEffect(() => this.actions$
    .pipe(
      ofType(markStared),
      exhaustMap(
        (action: TodoStaredData) =>
          this.todoService.markStared(action.id, action.stared)
            .pipe(
              map(() => markStaredSuccess({...action}))
            )
      )
    )
  )

  markExecuted$ = createEffect(() => this.actions$
    .pipe(
      ofType(markExecuted),
      exhaustMap(
        (action: TodoExecutedData) =>
          this.todoService.markExecuted(action.id, action.executed)
            .pipe(
              map(() => markExecutedSuccess({...action}))
            )
      )
    )
  )

  edit$ = createEffect(() => this.actions$
    .pipe(
      ofType(edit),
      exhaustMap(
        (action: TodoEditData) =>
          this.todoService.editTodo(action.id, action.text)
            .pipe(
              map(id => editSuccess({...action}))
            )
      )
    )
  )

  constructor(private actions$: Actions,
              private todoService: TodoService) {
  }

}
