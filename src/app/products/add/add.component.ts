import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  productForm : FormGroup;

  constructor(private _fb : FormBuilder) { }

  ngOnInit() {
    this.productForm = this._fb.group({

    })
  }

}
