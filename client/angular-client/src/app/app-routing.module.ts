import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {AuthComponent} from './pages/auth/auth.component'
import {TodosComponent} from './pages/todos/todos.component'
import {ProfileComponent} from './pages/profile/profile.component'
import {AuthGuard} from './shared/classes/auth.guard'

const routes: Routes = [
  {
    path: '', component: AuthComponent
  },
  {
    path: 'todos', component: TodosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: '*', redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
