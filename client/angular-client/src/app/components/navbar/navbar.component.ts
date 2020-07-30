import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {reset} from '../../actions/auth.actions'
import {Router} from '@angular/router'
import * as fromAuth from '../../selectors/auth.selectors'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth$
  auth

  constructor(private store: Store<{ auth }>,
              private router: Router) {
    this.auth$ = store.pipe(select(fromAuth.selectAuth))
    this.auth$.subscribe(data => {
      this.auth = data
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(reset())
    this.router.navigate([''])
  }

}
