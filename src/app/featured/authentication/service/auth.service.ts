
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public SuperAdminLogin(data) {
    return this.http.post(ApiConstants.ADMIN_LOGIN, data);
  }
  public SuperAdminLogOut(data) {
    return this.http.post(ApiConstants.ADMIN_LOGOUT, data);
  }

  public SecondLogin(data) {
    return this.http.post(ApiConstants.SECOND_LOGIN, data);
  }

  public setCompany(data) {
    return this.http.post(ApiConstants.SET_SELECTED_COMPANY, data);
  }

  public changeSuperAdminCredentials(data) {
    return this.http.post(ApiConstants.CHANGE_CREDENTIALS, data);
  }

}
