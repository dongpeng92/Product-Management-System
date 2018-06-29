import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product : any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _productService : ProductsService,
              private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      console.log(data.pCode);
      this._productService.findproduct(data.pCode).subscribe((data) => {
        console.log(data);
        this.product = data;
        console.log("In details!!!!!!!!");
      })
    })
  }

  back() {
    this._router.navigate(['/products']);
  }

}
