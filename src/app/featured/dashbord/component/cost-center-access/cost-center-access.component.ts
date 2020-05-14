import { AppConstants } from 'src/app/shared/constants/app-constants';
import { LoaderService } from './../../../../shared/services/loader.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-cost-center-access',
  templateUrl: './cost-center-access.component.html',
  styleUrls: ['./cost-center-access.component.css']
})
export class CostCenterAccessComponent implements OnInit, AfterViewInit {
  public showEdit = false;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc = true;
  column = 'id';
  direction: number;
  allCostAccess: any;
  searchText: any;
  allusers: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  @ViewChild('SearchInput', { static: false }) SearchInput: ElementRef;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  isSearching: boolean;
  constructor(
    private dashboardSvc: DashbordService,
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllCenters();
    this.getAllUsers();
  }
  ngAfterViewInit() {
    this.searchUser();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllCenters();
  }
  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    this.editFormData = item;//this.formGeneratorService.editCostCenterAccess(item);
    this.showEdit = true;
  }
  submitEdit(data) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateCostAccess(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }

  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteCostCenterAcess(item);
  }

  openView(item) {
    this.showDetails = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }

  submitDelete(data) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCostAccess(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }

  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.addCostCenterAccess();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(data) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.addCostAccess(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllCenters(val);
      }
    })
  }

  getAllCenters(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.gerAllCostAccess(data).subscribe((res: any) => {
      this.allCostAccess = res.data;
      this.loaderSvc.hideLoader();
      this.isSearching = false;
      this.pagination.currentPage = res.current_page;
      this.pagination.totalPages = res.total;
    });
  }


  getAllUsers() {
    this.dashboardSvc.getUserChainList(null).subscribe((res: any) => {
      this.allusers = res.users;
    });
  }

}
