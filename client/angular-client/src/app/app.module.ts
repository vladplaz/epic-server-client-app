import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthComponent} from './pages/auth/auth.component'
import {ProfileComponent} from './pages/profile/profile.component'
import {TodosComponent} from './pages/todos/todos.component'
import {EditModalComponent} from './components/edit-modal/edit-modal.component'
import {LoginFormComponent} from './components/login-form/login-form.component'
import {RegisterFormComponent} from './components/register-form/register-form.component'
import {NavbarComponent} from './components/navbar/navbar.component'
import {SearchFormComponent} from './components/search-form/search-form.component'
import {SpinnerComponent} from './components/spinner/spinner.component'
import {TodoFormComponent} from './components/todo-form/todo-form.component'
import {TodoListItemComponent} from './components/todo-list-item/todo-list-item.component'
import {TodoListComponent} from './components/todo-list/todo-list.component'
import {TodoMainFormComponent} from './components/todo-main-form/todo-main-form.component'
import {EffectsModule} from '@ngrx/effects'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreModule} from '@ngrx/store'
import * as auth from './reducers/auth.reducer'
import * as todo from './reducers/todo.reducer'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {AuthEffects} from './effects/auth.effects'
import {TodoEffects} from './effects/todo.effects'
import {NotifierModule} from 'angular-notifier'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfileComponent,
    TodosComponent,
    EditModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NavbarComponent,
    SearchFormComponent,
    SpinnerComponent,
    TodoFormComponent,
    TodoListItemComponent,
    TodoListComponent,
    TodoMainFormComponent
  ],
  imports: [
    NotifierModule.withConfig({
      position:{
        horizontal:{
          position:'right'
        },
        vertical:{
          position:'top'
        }
      },
      behaviour:{
        autoHide:2000
      },
      animations:{
        enabled:true,
        show:{
          preset:'slide',
          speed:300,
          easing:'ease'
        },
        hide:{
          preset:'fade',
          speed:300,
          easing:'ease'
        }
      }
    }),
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      auth: auth.reducer,
      todo: todo.reducer
    }),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, TodoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
