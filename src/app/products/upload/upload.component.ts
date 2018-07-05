import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFile : File = null;
  imageUrl : any;

  @Output() urlToAdd : EventEmitter<string> = new EventEmitter<string>();

  constructor(private _http : HttpClient, private _cookieService : CookieService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('imageUrl', this.selectedFile, this.selectedFile.name);
    console.log(fd);
    this._http.post('http://localhost:3000/uploadFile', fd).subscribe((data:any) => {
      console.log(data);
      this.imageUrl = data.imageUrl;
      console.log(this.imageUrl);
      this.urlToAdd.emit(this.imageUrl);
    });
  }
}
