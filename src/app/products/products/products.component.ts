import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  pageTitle : String = "Product List";

  products : any = [];

  showHideImg : Boolean = true;

  filterBy: string = "";

constructor(private _productService : ProductsService) { }

  ngOnInit() {
    this._productService.getproducts().subscribe((data:any) => {
      console.log(data);
      this.products = data;
    })
  }

  toggleImage() {
    this.showHideImg = !this.showHideImg
  }
}
