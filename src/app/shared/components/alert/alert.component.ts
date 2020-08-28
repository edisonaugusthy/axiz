import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
const CLASS_TYPES = {
  warning: 'warning',
  error: 'error',
  danger: 'error',
  success: 'success'
}
const HEADER_TYPES = {
  warning: 'Warning',
  error: 'Error',
  danger: 'Error',
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

  settings = {
    closeButton: true,
    timeOut: 4000,
    easing: 'ease-in',
    progressBar: true,
    preventDuplicates: true,
  }

  constructor(private alertSvc: AlertService, private toastr: ToastrService) {

  }
  ngOnInit() {

    this.alertSvc.getAlertStatus().subscribe((val: any) => {
      if (val) {
        switch (val.type) {
          case CLASS_TYPES.warning:
            this.toastr.warning(val.message, HEADER_TYPES[val.type], this.settings);
            break;
          case CLASS_TYPES.danger:
            this.toastr.error(val.message, HEADER_TYPES[val.type], this.settings);
            break;
          case CLASS_TYPES.error:
            this.toastr.error(val.message, HEADER_TYPES[val.type], this.settings);
            break;
          case CLASS_TYPES.success:
            this.toastr.success(val.message, HEADER_TYPES[val.type], this.settings);
            break;
          default:
            this.toastr.error(val.message, HEADER_TYPES[val.type], this.settings);
            break;
        }


        // this.showAlert = false;
        // this.alerts = val;
        // this.alerts.class = CLASS_TYPES[(this.alerts.type || 'warning')];
        // this.alerts.title = HEADER_TYPES[(this.alerts.type || 'warning')]
        // this.showAlert = true;
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
