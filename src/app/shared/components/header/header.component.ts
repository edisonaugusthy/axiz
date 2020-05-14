import { AppConstants } from './../../constants/app-constants';
import { environment } from './../../../../environments/environment';
import { AlertService } from './../../services/alert.service';
import { DashbordService } from './../../../featured/dashbord/services/dashbord.service';
import { FormGeneratorService } from './../../services/form-generator.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserType } from 'src/app/featured/authentication/models/user-type.enum';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgStorageService } from 'ng7-storage';
import { AuthService } from 'src/app/featured/authentication/service/auth.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
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
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;


  constructor(
    private router: Router,
    private StorageService: NgStorageService,
    private authService: AuthService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private dashboardSvc: DashbordService,
  ) { }

  ngOnInit() {
    if (this.StorageService.getData('user_type') === UserType.SuperAdmin) {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }
    this.userDetails = this.StorageService.getData('user_details');
    this.openNav();
    this.search();
  }

  logout() {
    this.loaderSvc.showLoader();
    this.authService.SuperAdminLogOut(null).subscribe(val => {
      this.StorageService.removeAll();
      this.router.navigateByUrl('/login');
      this.loaderSvc.hideLoader();
    });

  }


  search() {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(AppConstants.SEARCH_TIMEOUT),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.dashboardSvc.setSearchString(text);
    });
  }

  openNav() {
    this.toggleSideBar.emit(true);
  }
  openAdd() {
    const mail = this.StorageService.getData('super-admin-mail');
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.SuperAdminLoginForm(mail);
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  showDashbord() {
    this.router.navigateByUrl('/dashbord/dashbord');
  }
  submitAdd(res) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.authService.SuperAdminLogin(res).subscribe((val: any) => {
      if (val.data && val.message === 'login success') {
        this.router.navigateByUrl('/dashbord/dashbord');
        this.StorageService.setData({ key: 'user_type', value: val.UserRole });
        this.StorageService.setData({ key: 'user_details', value: val.data.userdetails });
        this.StorageService.setData({ key: 'access_token', value: val.data.token });
        this.StorageService.setData({ key: 'super-admin-mail', value: val.superadmin });
        setTimeout(() => {
          window.location.reload();
        }, 100)
      } else {
        this.loaderSvc.hideLoader();
        this.alert.showAlert({ message: val.error, type: 'warning' });
      }
      this.loaderSvc.hideLoader();
    });
  }
}
