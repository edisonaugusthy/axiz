import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgStorageService } from 'ng7-storage';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private StorageService: NgStorageService,
    private loaderSVC: LoaderService,
    private alertService: AlertService
  ) { }
  ngOnInit() {
    this.StorageService.removeAll();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loaderSVC.showLoader();
    this.authService.SuperAdminLogin(this.loginForm.value).subscribe((val: any) => {
      if (val.data && val.message === 'login success') {
        this.router.navigateByUrl('/dashbord/dashbord');
        this.StorageService.setData({ key: 'user_type', value: val.UserRole });
        this.StorageService.setData({ key: 'user_details', value: val.data.userdetails });
        this.StorageService.setData({ key: 'access_token', value: val.data.token });
        this.StorageService.setData({ key: 'super-admin-mail', value: val.superadmin });
      } else {
        this.loaderSVC.hideLoader();
        this.alertService.showAlert({ message: val.error, type: 'warning' });
      }
    });



  }


}
