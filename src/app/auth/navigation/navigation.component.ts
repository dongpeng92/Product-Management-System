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

  ngOnInit() {
    if(this._cookieService.get('toggle')) {
      this.toggleLink = true;
    } else {
      this.toggleLink = false;
    }
    this._authService.$authObservable.subscribe((data : any) => {
      console.log(data);
      this.toggleLink = data;
    })

  }

  logout() {
    this._authService.logout();
  }

}
