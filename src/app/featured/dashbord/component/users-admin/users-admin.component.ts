import { AppConstants } from 'src/app/shared/constants/app-constants';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-users-admin',
  templateUrl: 'users-admin.component.html',
  styleUrls: ['users-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersAdminComponent implements OnInit, AfterViewInit {
  allUsers: any;
  editFormData: any;
  showEdit: boolean;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'user_id';
  direction: number;
  allCompanies: any;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  isSearching: boolean;
  @ViewChild('SearchInput', { static: false }) SearchInput: ElementRef;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  constructor(
    private dashboardSvc: DashbordService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private deleteMessageSvc: DeleteMessageService) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllCompanies();
    this.getAllUsers();
  }

  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllUsers();
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    this.editFormData = item;
    //this.formGeneratorService.editUsersInSuperAdmin(item);
    this.showEdit = true;
  }

  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateUser(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllUsers();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }


  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteAdminUser(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteUser({ userid: val.user_id }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.getAllUsers();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }
  openView(item) {
    this.showDetails = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }

  openAdd() {
    // this.addFormData = this.formGeneratorService.addUsersInSuperAdmin();
    if (this.allCompanies) {
      this.showAdd = true;
    }
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false
    this.loaderSvc.showLoader();
    this.dashboardSvc.createUser(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllUsers();
    });
  }

  getAllUsers(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.getUserListing(data).subscribe((val: any) => {
      this.allUsers = val.details.data;
      this.loaderSvc.hideLoader();
      this.pagination.currentPage = val.details.current_page;
      this.pagination.totalPages = val.details.total;
    });
  }

  ngAfterViewInit() {
    this.searchUser();
  }
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllUsers(val);
      }
    })
  }
  getAllCompanies() {
    this.dashboardSvc.getAllCompanies(null).subscribe((val: any) => {
      this.allCompanies = val.data;
    });
  }

}

