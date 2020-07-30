import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../shared/services/auth.service'
import {catchError, exhaustMap, map} from 'rxjs/operators'
import {of} from 'rxjs'
import {
  login,
  register,
  edit,
  loginSuccess,
  registerSuccess,
  editSuccess,
  loginFailure,
  registerFailure, editFailure, loginFromStore, reset, resetSuccess
} from '../actions/auth.actions'
import {UserData, UserEditData, UserEditDataSuccess, UserLoginData, UserRegisterData} from '../shared/interfaces'
import {TokenService} from '../shared/services/token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(login),
      exhaustMap((action: UserLoginData) =>
        this.authService.login(action)
          .pipe(
            map((user: UserData) => {
              this.tokenService.setToken(user.token)
              return loginSuccess(user)
            }),
            catchError(err => of(loginFailure({message: err.error.message})))
          )
      )
    )
  )

  loginFromStore$ = createEffect(() => this.actions$
    .pipe(
      ofType(loginFromStore),
      exhaustMap(() => {
          const token = this.tokenService.getToken()
          if(token) {
            return this.authService.loadUser(this.tokenService.getPayload().userId)
              .pipe(
                map((user: UserData) => loginSuccess({...user, token}))
              )
          } else {
            return of(resetSuccess())
          }
        }
      )
    )
  )

  register$ = createEffect(() => this.actions$
    .pipe(
      ofType(register),
      exhaustMap(
        (action: UserRegisterData) =>
          this.authService.register(action)
            .pipe(
              map((user: UserData) => {
                this.tokenService.setToken(user.token)
                return registerSuccess(user)
              }),
              catchError(err => of(registerFailure({message: err.error.message})))
            )
      )
    )
  )

  edit$ = createEffect(() => this.actions$
    .pipe(
      ofType(edit),
      exhaustMap(
        (user: UserEditData) =>
          this.authService.editUser(user)
            .pipe(
              map((data: UserEditDataSuccess) => editSuccess(data)),
              catchError(err => of(editFailure({message: err.error.message})))
            )
      )
    )
  )

  reset$ = createEffect(() => this.actions$
    .pipe(
      ofType(reset),
      exhaustMap(
        () => {
          this.tokenService.deleteToken()
          return of(resetSuccess())
        }
      )
    )
  )

  constructor(private actions$: Actions,
              private authService: AuthService,
              private tokenService: TokenService) {
  }

}
