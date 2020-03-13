import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

const CLASS_TYPES = {
  warning: 'warning',
  error: 'error',
  success: 'success'
}
const HEADER_TYPES = {
  warning: 'Warning',
  error: 'Error',
  success: 'Success'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})


export class AlertComponent implements OnInit {

  alerts: any;
  showAlert: boolean;

  constructor(private alertSvc: AlertService) {

  }
  ngOnInit() {

    this.alertSvc.getAlertStatus().subscribe((val: any) => {
      if (val) {
        this.showAlert = false;
        this.alerts = val;
        this.alerts.class = CLASS_TYPES[this.alerts.type];
        this.alerts.title = HEADER_TYPES[this.alerts.type]
        this.showAlert = true;
      }
      else {
        this.close();
      }
    })
  }

  close() {
    this.showAlert = false;
    this.alerts = null;
  }

}
