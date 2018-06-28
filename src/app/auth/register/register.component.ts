import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regform : any = {};
  users : any = localStorage.users ? JSON.parse(localStorage.users) : [];

  constructor(private _authService : AuthService) { }

  ngOnInit() {

  }

  register() {
    console.log(this.regform);
    this._authService.register(this.regform);
  }

}
