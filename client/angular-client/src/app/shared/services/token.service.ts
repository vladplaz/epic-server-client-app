import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string {
    const token = localStorage.getItem('token')
    if(token && token !== 'undefined') {
      let payload =
        JSON.parse(window.atob(token.split('.')[1]))
      if(payload.exp - Date.now() / 1000 <= 60 * 30) {
        this.deleteToken()
        return ''
      }
      return token
    }
    this.deleteToken()
    return ''
  }

  deleteToken(): void {
    localStorage.clear()
  }

  getPayload(): any {
    const token = this.getToken()
    let payload = ''
    if(token) {
      payload = token.split('.')[1]
      payload = JSON.parse(window.atob(payload))
    }
    return payload
  }

}


