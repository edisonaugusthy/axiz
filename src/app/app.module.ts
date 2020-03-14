import { LoginComponent } from './featured/authentication/component/login/login.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageModule } from 'ng7-storage';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterCeptor } from './shared/services/interCeptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    StorageModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterCeptor,
    multi: true
  }],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
