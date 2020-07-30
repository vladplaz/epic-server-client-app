import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {TokenService} from './token.service'


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  fetchTodos(): Observable<any> {
    return this.http.get<any>('/api/todo',
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`
        }
      })
  }

  addTodo(todo): Observable<any> {
    return this.http.post<any>('/api/todo',
      JSON.stringify(todo),
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
  }

  deleteTodo(idsToDelete): Observable<any> {
    return this.http.post<any>('/api/todo/delete',
      JSON.stringify(idsToDelete),
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
  }

  markStared(id, stared): Observable<any> {
    return this.http.post<any>(`/api/todo/star`,
      JSON.stringify({id, stared}),
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
  }

  markExecuted(id, executed): Observable<any> {
    return this.http.post<any>(`/api/todo/exec`,
      JSON.stringify({id, executed}),
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
  }

  editTodo(id, text): Observable<any> {
    return this.http.patch<any>(`/api/todo`,
      JSON.stringify({id, text}),
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
  }

}
