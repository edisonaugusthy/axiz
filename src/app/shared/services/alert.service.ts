import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private loaderStatus = new BehaviorSubject<any>(null);

  constructor() { }

  showAlert(val: object) {
    this.loaderStatus.next(val);
    setTimeout(() => {
      this.hideAlert();
    }, 4000);
  }

  hideAlert() {
    this.loaderStatus.next(null);
  }

  getAlertStatus(): Observable<any> {
    return this.loaderStatus.asObservable();
  }
}
