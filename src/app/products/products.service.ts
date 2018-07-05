import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http : HttpClient, private _authService : AuthService) { }

  getproducts() {
    return this._http.get('http://localhost:3000/getproducts');
  }

  findproduct(pCode) {
    var token = this._authService.checkUserStatus();
    return this._http.get(`http://localhost:3000/findproduct?code=${pCode}`);
  }

  createProduct(form) {
    return this._http.post('http://localhost:3000/addproduct', form);
  }

}
