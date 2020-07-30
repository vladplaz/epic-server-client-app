import {Component, Input} from '@angular/core'
import {Todo} from '../../shared/interfaces'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input('todos') todos: Todo[]

}
