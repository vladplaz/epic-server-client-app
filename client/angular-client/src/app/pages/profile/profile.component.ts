import {Component} from '@angular/core'
import {ActionsSubject, select, Store} from '@ngrx/store'
import * as fromAuth from '../../selectors/auth.selectors'
import {edit, editSuccess} from '../../actions/auth.actions'
import {ofType} from '@ngrx/effects'
import {NotifierService} from 'angular-notifier'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  loading
  userName
  image
  imagePreview
  auth$

  constructor(private store: Store,
              private actionsSubj: ActionsSubject,
              private notifier: NotifierService) {
    this.actionsSubj.pipe(
      ofType(editSuccess)
    ).subscribe(() => {
      this.notifier.notify('success', 'Edit complete')
      this.loading = false
    })
    this.auth$ = store.pipe(select(fromAuth.selectAuth))
    this.auth$.subscribe(data => {
      this.userName = data.userName
      this.imagePreview = data.imageUrl
    })
  }

  submitHandler(e) {
    e.preventDefault()
    this.loading = true
    this.store.dispatch(edit({
      userName: this.userName,
      image: this.image
    }))
  }

  imageHandler(e) {
    const reader = new FileReader()
    if(e.target.files && e.target.files[0]) {
      this.image = e.target.files[0]
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

}
