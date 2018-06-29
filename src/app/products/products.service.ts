import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http : HttpClient) { }

  getproducts() {
    return this._http.get('http://localhost:3000/getproducts');
  }

  findproduct(pCode) {
    return this._http.get(`http://localhost:3000/findproduct?code=${pCode}`);
  }

}
