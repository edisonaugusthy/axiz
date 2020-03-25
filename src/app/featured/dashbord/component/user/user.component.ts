import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
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

  getAllUsers() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.gerAllNormalUser(this.pagination.currentPage).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.allUsers = val.location_data.data;
      this.pagination.currentPage = val.location_data.current_page;
      this.pagination.totalPages = val.location_data.total;

    });
  }
}
