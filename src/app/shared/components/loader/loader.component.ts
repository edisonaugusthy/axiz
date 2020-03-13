import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private LoaderSvc: LoaderService,private spinner: NgxSpinnerService) { }
  showLoader: boolean = false;
  ngOnInit() {
    // this.LoaderSvc.getLoaderStatus().subscribe((val: boolean) => {
    //   if (val) {
    //     this.spinner.show()
    //   } else {
    //     this.spinner.hide();
    //   }
    // });
  }
 
}
