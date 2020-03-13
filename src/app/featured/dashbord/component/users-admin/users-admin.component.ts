import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: 'users-admin.component.html',
  styleUrls: ['users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
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
  constructor(
    private dashboardSvc: DashbordService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private deleteMessageSvc: DeleteMessageService) { }

  ngOnInit() {
    this.getAllCompanies();
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
      this.alert.showAlert({ message: val.message, type: 'success' });
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
      this.alert.showAlert({ message: val.message, type: 'success' });
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
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
      this.alert.showAlert({ message: val.message, type: 'success' });
      this.getAllUsers();
    });
  }

  getAllUsers() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getUserListing(null).subscribe((val: any) => {
      this.allUsers = val.details;
      this.loaderSvc.hideLoader();
    });
  }


  getAllCompanies() {
    this.dashboardSvc.getAllCompanies(null).subscribe((val: any) => {
      this.allCompanies = val.data;
    });
  }

}

