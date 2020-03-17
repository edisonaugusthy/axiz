import { environment } from './../../../../environments/environment';
import { AlertService } from './../../services/alert.service';
import { DashbordService } from './../../../featured/dashbord/services/dashbord.service';
import { FormGeneratorService } from './../../services/form-generator.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserType } from 'src/app/featured/authentication/models/user-type.enum';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgStorageService } from 'ng7-storage';
import { AuthService } from 'src/app/featured/authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSuperAdmin = false;
  userDetails: any;
  showAdd: boolean;
  addFormData: any;
  imageBase = environment.imageBase;
  showSideBar = false;
  @Output() toggleSideBar = new EventEmitter<any>();



  constructor(
    private router: Router,
    private StorageService: NgStorageService,
    private authService: AuthService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    if (this.StorageService.getData('user_type') === UserType.SuperAdmin) {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }
    this.userDetails = this.StorageService.getData('user_details');
    this.openNav();
  }

  logout() {
    this.loaderSvc.showLoader();
    this.authService.SuperAdminLogOut(null).subscribe(val => {
      this.StorageService.removeAll();
      this.router.navigateByUrl('/login');
      this.loaderSvc.hideLoader();
    });

  }

  openNav() {
    this.toggleSideBar.emit(true);
    // this.showSideBar = !this.showSideBar;
    // if (this.showSideBar) {
    //   document.getElementById("mySidebar").style.width = "250px";
    //   document.getElementById("content-area").style.marginLeft = "0px";
    // } else {
    //   document.getElementById("mySidebar").style.width = "0";
    //   document.getElementById("content-area").style.marginLeft = "0";
    // }
  }
  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.SuperAdminLoginForm(this.userDetails);
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.authService.SecondLogin(val).subscribe((res: any) => {
      if (res.details && res.details.details) {
        this.StorageService.removeAll();
        this.router.navigateByUrl('/dashbord/dashbord');
        this.StorageService.setData({ key: 'user_type', value: UserType.SuperAdmin });
        this.StorageService.setData({ key: 'user_details', value: res.details.details });
        this.StorageService.setData({ key: 'access_token', value: res.details.token });
        setTimeout(() => {
          window.location.reload();
        }, 100)
      } else {
        this.loaderSvc.hideLoader();
        this.alert.showAlert({ message: val.message, type: 'warning' });
      }
      this.loaderSvc.hideLoader();
    });
  }
}
