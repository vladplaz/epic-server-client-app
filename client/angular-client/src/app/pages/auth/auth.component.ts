import {
  AfterViewInit, Component,
  ElementRef, OnDestroy, ViewChild
} from '@angular/core'
import MaterializeService from '../../shared/classes/MaterializeService'
import {Store} from '@ngrx/store'
import {login, loginFailure, loginSuccess, register, registerFailure, registerSuccess} from '../../actions/auth.actions'
import {ActionsSubject} from '@ngrx/store'
import {ofType} from '@ngrx/effects'
import {Subscription} from 'rxjs'
import {NotifierService} from 'angular-notifier'
import {Router} from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit, OnDestroy {

  loading
  @ViewChild('tabs') tabs: ElementRef
  subsc = new Subscription()

  constructor(private store: Store,
              actionSubj: ActionsSubject,
              private notifier: NotifierService,
              private router: Router) {
    this.subsc = actionSubj.pipe(
      ofType(loginFailure, registerFailure)
    ).subscribe(data => {
      this.notifier.notify('success', data.message || 'Error')
      this.loading = false
    })
    actionSubj.pipe(
      ofType(loginSuccess, registerSuccess)
    ).subscribe(() => {
      this.router.navigate(['/todos'])
    })
  }

  loginHandler(data) {
    this.loading = true
    this.store.dispatch(login(data))
  }

  registerHandler(data) {
    this.loading = true
    this.store.dispatch(register(data))
  }

  ngAfterViewInit(): void {
    MaterializeService.initTabs(this.tabs)
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe()
  }

}
