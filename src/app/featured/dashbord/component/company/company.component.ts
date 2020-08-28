import { AppConstants } from 'src/app/shared/constants/app-constants';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit {
  companies: any;
  editFormData: any;
  showEdit: boolean;
  showDelete: boolean;
  deleteData: any
  showAdd: boolean;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'id';
  direction: number;
  AllCurrency: any;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  @ViewChild('SearchInput', { static: false }) SearchInput: ElementRef;
  isSearching: boolean;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  constructor(
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllCompany();
    this.getAllCurrency(4);
  }
  ngAfterViewInit() {
    this.searchUser();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllCompany();
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    if (this.AllCurrency) {
      this.editFormData = item;
      this.showEdit = true;
    }
    else {
      this.getAllCurrency(1, item)
    }

  }
  openView(item) {
    if (this.AllCurrency) {
      this.showDetails = true;
      this.detailsData = item;
    }
    else {
      this.getAllCurrency(2, item)
    }

  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteCompany(item);
  }

  submitDelete(data) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCompany({ companyid: data.CompanyID }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'error' });
      }
      this.getAllCompany();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }


  openAdd() {
    if (this.AllCurrency) {
      this.addFormData = this.formGeneratorService.addCompany();
      this.showAdd = true;
    }
    else {
      this.getAllCurrency(3)
    }

  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(data) {
    this.showAdd = false
    this.loaderSvc.showLoader();
    this.dashboardSvc.registerCompany(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'error' });
      }
      this.getAllCompany();
    });
  }

  submitEdit(data) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateCompany(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'error' });
      }
      this.getAllCompany();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllCompany(val);
      }
    })
  }
  getAllCompany(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.getCompanyListing(data).subscribe((val: any) => {
      this.companies = val.details.data;
      this.loaderSvc.hideLoader();
      this.isSearching = false;
      this.pagination.currentPage = val.details.current_page;
      this.pagination.totalPages = val.details.total;
    });
  }
  getAllCurrency(id, item?) {
    this.loaderSvc.showLoader();
    this.AllCurrency = [];
    this.dashboardSvc.getAllCUrrency(null).subscribe((val: any) => {
      this.AllCurrency = val.currencies;
      this.loaderSvc.hideLoader();
      switch (id) {
        case 1:
          this.openEdit(item)
          break;
        case 3:
          this.openAdd();
          break;
        case 3:
          this.openView(item);
          break;
        default:
          break;
      }
    });
  }

}
