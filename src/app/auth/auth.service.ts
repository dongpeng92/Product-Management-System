import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authObservable : Subject<any> = new Subject<any>();

  constructor(private _http : HttpClient, private _router : Router,
              private _cookieService : CookieService) { }

  register(reg_details : any) {
    this._http.post('http://localhost:3000/register', reg_details).subscribe((data : any) => {
      if(data.flg) {
        alert("Register Successfully, Please Login");
        this._router.navigate(['/login'])
      }
    })
  }

  login(login_details : any) {
    this._http.post('http://localhost:3000/authenticate', login_details).subscribe((data:any) => {
      if(data.isLoggedIn) {
        this._cookieService.set('token', data.token);
        this._cookieService.set('toggle', data.isLoggedIn);
        this.$authObservable.next(data.isLoggedIn);
        this._router.navigate(['/home']);
      } else {
        alert("Invalid Username or Password");
      }
    })
  }

  checkUserStatus() {
    return this._cookieService.get('token');
  }

  logout() {
    this._cookieService.delete('token');
    this._cookieService.delete('toggle');
    this.$authObservable.next(false);
    this._router.navigate(['/home']);
  }
}
