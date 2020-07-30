import {createFeatureSelector, createSelector} from '@ngrx/store'
import {TodoState} from '../reducers/todo.reducer'

export const selectTodosFeature = createFeatureSelector<TodoState>('todo')

export const selectTodos = createSelector(
  selectTodosFeature,
  (state): any => ({
    ...state
  })
)
