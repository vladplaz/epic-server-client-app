import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin = new EventEmitter()
  @Input() loading
  form: FormGroup

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.onLogin.emit(this.form.value)
  }

}
