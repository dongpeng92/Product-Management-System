import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient, private _router : Router) { }

  register(reg_details : any) {
    this._http.post('http://localhost:3000/register', reg_details).subscribe((data : any) => {
      if(data.flg) {
        alert("Register Successfully, Please Login");
        this._router.navigate(['/login'])
      }
    })
  }
}
