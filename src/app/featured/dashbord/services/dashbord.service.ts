import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { ApiConstants } from 'src/app/shared/constants/ApiConstants';
@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  public searchStr = new BehaviorSubject<any>(null);
  public userSwichStatus = new BehaviorSubject<boolean>(false);
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.SUPER_ADMIN_COMPANY_TABLE;
    return this.http.get(url, { params });
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.SUPER_ADMIN_USER_TABLE;
    return this.http.get(url, { params });
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.SUPER_ADMIN_COMPANY_ACCESS_TABLE;
    return this.http.get(url, { params });
  }

  getContactUs(data) {
    return this.http.post(ApiConstants.VIEW_CONTACT_US, data);
  }

  deleteContactUs(data) {
    return this.http.post(ApiConstants.DELETE_CONTACT_US, data);
  }

  getRequests(data) {
    return this.http.post(ApiConstants.GET_REQUESTS, data);
  }

  updateRequests(data) {
    return this.http.post(ApiConstants.UPDATE_REQUESTS, data);
  }

  getFaq(data) {
    return this.http.post(ApiConstants.GET_ALL_FAQ, data);
  }
  addFaq(data) {
    return this.http.post(ApiConstants.ADD_FAQ, data);
  }
  editFaq(data) {
    return this.http.post(ApiConstants.EDIT_FAQ, data);
  }
  deleteFaq(data) {
    return this.http.post(ApiConstants.DELETE_FAQ, data);
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.GET_CHAINS;
    return this.http.get(url, { params });
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.GET_LOCATIONS;
    return this.http.get(url, { params });
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
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.GET_USERS;
    return this.http.get(url, { params });
  }


  deleteCostAccess(data) {
    return this.http.post(ApiConstants.DELETE_COST_CENTER_ACCESS, data);
  }
  updateCostAccess(data) {
    return this.http.post(ApiConstants.UPDATE_COST_CENTER_ACCESS, data);
  }
  gerAllCostAccess(data) {
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.GET_COST_CENTER_ACCESS;
    return this.http.get(url, { params });
  }
  addCostAccess(data) {
    return this.http.post(ApiConstants.ADD_COST_CENTER_ACCESS, data);
  }




  getUserDashboard(data) {
    return this.http.post(ApiConstants.GET_DASHBOARD_ADMIN, data);
  }
  getAdminDashboard(data) {
    return this.http.post(ApiConstants.GET_SUPER_ADMIN_DASHBOARD, data);
  }



  getUserCurrencyList(data) {
    let params = new HttpParams().set('page', data.page);
    params = params.set('search', data.search);
    const url = ApiConstants.GET_CURRENCY_LIST;
    return this.http.get(url, { params });
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


  // listing for edit/add popups
  getAllCUrrency(data) {
    return this.http.post(ApiConstants.GET_TOTAL_CURRENCY_LIST, data);
  }

  getAllChains(data) {
    return this.http.post(ApiConstants.GET_CHAIN_LIST, data);
  }
  getAllLocations(data) {
    return this.http.post(ApiConstants.GET_LOCATION_LIST, data);
  }

  getUserChainList(data) {
    return this.http.post(ApiConstants.GET_USER_CHAIN_LIST, data);
  }

  getAllCompanies(data) {
    return this.http.post(ApiConstants.GET_ALL_COMPANIES_LIST, data);
  }
  getUserCompanies(data) {
    return this.http.post(ApiConstants.GET_USER_COMPANIES_LIST, data);
  }


  // search
  setSearchString(val) {
    this.searchStr.next(val);
  }
  getSearch() {
    return this.searchStr.asObservable;
  }

  switchUser(val: boolean) {
    this.userSwichStatus.next(val);
  }

  getFormData(val) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(val)) {
      formData.append(key, val[key]);
    }
    return formData;

  }
  public checkStatus() {
    const url = 'https://immense-oasis-01790.herokuapp.com/status';
    return this.http.get(url);
  }
}
