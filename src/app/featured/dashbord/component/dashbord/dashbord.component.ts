import { UserType } from 'src/app/featured/authentication/models/user-type.enum';
import { LoaderService } from './../../../../shared/services/loader.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { NgStorageService } from 'ng7-storage';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  dashboardData: any;
  isSuperAdmin: boolean;

  constructor(
    private dashBordService: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private StorageService: NgStorageService,
  ) { }

  ngOnInit() {
    if (this.StorageService.getData('user_type') === UserType.SuperAdmin) {
      this.getAdminDashBord();
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
      this.getUserDahbord();
    }

  }

  getUserDahbord() {
    this.loaderSvc.showLoader();
    this.dashBordService.getUserDashboard(null).subscribe(val => {
      this.loaderSvc.hideLoader();
      this.dashboardData = val;
    });
  }

  getAdminDashBord() {
    this.loaderSvc.showLoader();
    this.dashBordService.getAdminDashboard(null).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.length > 0) {
        this.dashboardData = val[0];
      }
    });
  }

}
