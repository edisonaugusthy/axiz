import { AppConstants } from 'src/app/shared/constants/app-constants';
import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  public showEdit = false;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'user_id';
  direction: number;
  allUsers: any;
  @ViewChild('SearchInput', { static: false }) SearchInput: ElementRef;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
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
    this.getAllUsers();

  }
  ngAfterViewInit() {
    this.searchUser();
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  openEdit(item?) {
    this.editFormData = this.formGeneratorService.editUser(item);
    this.editFormData.id = item.id;
    this.showEdit = true;
  }

  openView(item) {
    this.showDetails = true;
    this.detailsData = this.formGeneratorService.UserDetails(item);
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllUsers();
  }

  submitEdit(data) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    data.id = this.editFormData.id;
    this.dashboardSvc.updateNormalUser(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.editFormData = null;
      this.getAllUsers();
    });

  }
  cancelEdit(val) {
    this.showEdit = false;

  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteUser(item);
  }

  submitDelete(data) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteNormalUser({ id: data.id }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllUsers();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }

  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.addUser();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.createNormalUser(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (res && res.status) {
        this.alert.showAlert({ message: res.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: res.message, type: 'danger' });
      }
      this.getAllUsers();
    });
  }
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllUsers(val);
      }
    })
  }
  getAllUsers(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.gerAllNormalUser(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.isSearching = false;
      this.allUsers = val.location_data.data;
      this.pagination.currentPage = val.location_data.current_page;
      this.pagination.totalPages = val.location_data.total;

    });
  }
}
