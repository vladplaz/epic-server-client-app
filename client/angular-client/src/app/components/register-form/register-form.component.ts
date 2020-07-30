import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output() onRegister = new EventEmitter()
  @Input() loading
  form: FormGroup

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',
        [Validators.required, Validators.minLength(6)]),
      userName: new FormControl('', Validators.required)
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.onRegister.emit(this.form.value)
  }

}
