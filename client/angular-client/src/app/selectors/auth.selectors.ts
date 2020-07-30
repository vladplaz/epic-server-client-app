import {AuthState} from '../reducers/auth.reducer'
import {createFeatureSelector, createSelector} from '@ngrx/store'

export const selectAuthFeature = createFeatureSelector<AuthState>('auth')

export const selectAuth = createSelector(
  selectAuthFeature,
  (state: AuthState): any => ({
    ...state
  })
)
