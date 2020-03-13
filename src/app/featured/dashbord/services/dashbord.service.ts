import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient) { }
  // superAdmin part
  registerCompany(Data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_REGISTER_COMPANY, Data);
  }
  updateCompany(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_UPDATE_COMPANY, data);
  }
  deleteCompany(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_DELETE_COMPANY, data);
  }
  getCompanyListing(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_COMPANY_TABLE, data);
  }



  createUser(Data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_CREATE_USER, Data);
  }
  updateUser(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_UPDATE_USER, data);
  }
  deleteUser(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_DELETE_USER, data);
  }

  getUserListing(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_USER_TABLE, data);
  }


  createCompanyAccess(Data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_ADD_COMPANY_ACCESS, Data);
  }
  updateCompanyAccess(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_UPDATE_COMPANY_ACCESS, data);
  }
  deleteCompanyAccess(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_DELETE_COMPANY_ACCESS, data);
  }
  getCompanyAccess(data) {
    return this.http.post(ApiConstants.SUPER_ADMIN_COMPANY_ACCESS_TABLE, data);

  }


  getAllCompanies(data) {
    return this.http.post(ApiConstants.GET_ALL_COMPANIES_LIST, data);
  }


  // admin part

  createChain(data) {
    return this.http.post(ApiConstants.ADD_CHAIN, data);
  }
  deleteChain(data) {
    return this.http.post(ApiConstants.DELETE_CHAIN, data);
  }
  updateChain(data) {
    return this.http.post(ApiConstants.UPDATE_CHAIN, data);
  }
  gerAllChain(data) {
    return this.http.post(ApiConstants.GET_CHAINS, data);
  }


  createLocation(data) {
    return this.http.post(ApiConstants.ADD_LOCATION, data);
  }
  deleteLocation(data) {
    return this.http.post(ApiConstants.DELETE_LOCATION, data);
  }
  updateLocation(data) {
    return this.http.post(ApiConstants.UPDATE_LOCATION, data);
  }
  gerAllLocation(data) {
    return this.http.post(ApiConstants.GET_LOCATIONS, data);
  }


  createNormalUser(data) {
    return this.http.post(ApiConstants.ADD_USER, data);
  }
  deleteNormalUser(data) {
    return this.http.post(ApiConstants.DELETE_USER, data);
  }
  updateNormalUser(data) {
    return this.http.post(ApiConstants.UPDATE_USER, data);
  }
  gerAllNormalUser(data) {
    return this.http.post(ApiConstants.GET_USERS, data);
  }


  deleteCostAccess(data) {
    return this.http.post(ApiConstants.DELETE_COST_CENTER_ACCESS, data);
  }
  updateCostAccess(data) {
    return this.http.post(ApiConstants.UPDATE_COST_CENTER_ACCESS, data);
  }
  gerAllCostAccess(data) {
    return this.http.post(ApiConstants.GET_COST_CENTER_ACCESS, data);
  }
  addCostAccess(data) {
    return this.http.post(ApiConstants.ADD_COST_CENTER_ACCESS, data);
  }


  getAllChains(data) {
    return this.http.post(ApiConstants.GET_CHAIN_LIST, data);
  }
  getAllLocations(data) {
    return this.http.post(ApiConstants.GET_LOCATION_LIST, data);
  }

  getUserDashboard(data) {
    return this.http.post(ApiConstants.GET_DASHBOARD_ADMIN, data);
  }
  getAdminDashboard(data) {
    return this.http.post(ApiConstants.GET_SUPER_ADMIN_DASHBOARD, data);
  }


  getUserChainList(data) {
    return this.http.post(ApiConstants.GET_USER_CHAIN_LIST, data);
  }

  getUserCurrencyList(data) {
    return this.http.post(ApiConstants.GET_CURRENCY_LIST, data);
  }
  AddCurrency(data) {
    return this.http.post(ApiConstants.ADD_CURRENCY, data);
  }
  EditCurrency(data) {
    return this.http.post(ApiConstants.EDIT_CURRENCY, data);
  }
  DeleteCurrency(data) {
    return this.http.post(ApiConstants.DELETE_CURRENCY, data);
  }


}
