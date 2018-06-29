import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _authService : AuthService, private _cookieService : CookieService ) { }

  toggleLink : Boolean = false;
  // toggleLink : Boolean = this._cookieService.get('toggle');

  ngOnInit() {
    this._authService.$authObservable.subscribe((data : any) => {
      console.log(data);
      this.toggleLink = data;
    })

  }

  logout() {
    this._authService.logout();
  }

}
