

import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectCompanyPopupComponent } from './component/select-company-popup/select-company-popup.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    LoginComponent,
    SelectCompanyPopupComponent
  ]
})
export class AuthenticationModule { }
