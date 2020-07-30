import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {TokenService} from './token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  login({email, password}): Observable<any> {
    return this.http.post<any>('/api/auth/login',
      JSON.stringify({
        email, password
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  register({email, password, userName}): Observable<any> {
    return this.http.post<any>('/api/auth/register',
      JSON.stringify({
        email, password, userName
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  loadUser(id): Observable<any> {
    return this.http.get<any>(`/api/user/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokenService.getToken()}`
        }
      })
  }

  editUser(user): Observable<any> {
    const fd = new FormData()
    if(user.image) {
      fd.append('image', user.image, user.image)
    }
    fd.append('userName', user.userName)
    return this.http.patch<any>(`/api/user`,
      fd,
      {
        headers: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`
        }
      })
  }

}
