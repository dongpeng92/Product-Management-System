import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  productForm : FormGroup;

  constructor(private _fb : FormBuilder, private _productsService : ProductsService,
              private _router : Router) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      productId: ['', [Validators.required, Validators.minLength(1)]],
      productName: ['', [Validators.required, Validators.minLength(5)]],
      productCode: ['', [Validators.required, Validators.minLength(5)]],
      releaseDate: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      starRating: ['', [Validators.required, Validators.minLength(1)]],
      imageUrl: ['']
    })
  }

  UrlFn(data:string) {
    console.log("UrlFn called and data is " + data);
    this.productForm.value.imageUrl = data;
  }

  createProduct() {
    console.log(this.productForm.value);
    this._productsService.createProduct(this.productForm.value).subscribe((data) => {
      if(data) {
        alert("Product Saved!!");
        this._router.navigate(['/products']);
      }
    })
  }

}
