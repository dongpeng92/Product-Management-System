import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor{

  constructor(private _authService : AuthService) { }

  // for all the request to hit to get header
  intercept(req, next) {
    var token = this._authService.checkUserStatus();
    var authRequest = req.clone({
      headers: new HttpHeaders().set('authtoken', token)
    });
    return next.handle(authRequest);
  }
}
