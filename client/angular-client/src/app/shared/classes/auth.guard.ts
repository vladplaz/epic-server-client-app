import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot
} from '@angular/router'
import {of} from 'rxjs'
import {TokenService} from '../services/token.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.routeConfig.path === '') {
      if(!this.tokenService.getToken()) {
        return of(true)
      } else {
        return this.router.navigate(['/todos'])
      }
    }
    if(this.tokenService.getToken()) {
      return of(true)
    } else {
      this.router.navigate([''])
    }
  }

}
