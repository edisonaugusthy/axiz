import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private LoaderSvc: LoaderService, private spinner: NgxSpinnerService) { }
  showLoader: boolean = false;
  ngOnInit() {
    this.LoaderSvc.loaderState.subscribe((val: boolean) => {
      if (val) {
        this.showLoader = true;
        // this.spinner.show()
      } else {
        // this.showLoader = false;
        // this.spinner.hide();
      }
    });
  }

}
