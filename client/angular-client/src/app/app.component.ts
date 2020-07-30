import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {loginFromStore} from './actions/auth.actions'
import * as fromAuth from './selectors/auth.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  auth$
  loading = true

  constructor(private store: Store) {
    this.auth$ = store.pipe(select(fromAuth.selectAuth))
    this.auth$.subscribe(data => {
      this.loading = !data.isResolved
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loginFromStore())
  }

}
