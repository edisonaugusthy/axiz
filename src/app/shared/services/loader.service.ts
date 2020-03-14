import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }
  isloading = new Subject<any>();
  loaderState = this.isloading.asObservable();
  showLoader() {
    this.isloading.next(true);
  }

  hideLoader() {
    this.isloading.next(false);
  }

}
