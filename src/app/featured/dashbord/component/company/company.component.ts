import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
@Component({
  selector: 'app-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.scss']
})
export class CompanyComponent implements OnInit {
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
  constructor(
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService
  ) { }

  ngOnInit() {
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
      this.getAllCurrency(item)
    }

  }
  openView(item) {
    this.showDetails = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteCompany(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCompany({ companyid: val.CompanyID }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: val.message, type: 'success' });
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
      this.getAllCurrency(false)
    }

  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false
    this.loaderSvc.showLoader();
    this.dashboardSvc.registerCompany(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: val.message, type: 'success' });
      this.getAllCompany();
    });
  }

  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateCompany(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: val.message, type: 'success' });
      this.getAllCompany();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }

  getAllCompany() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getCompanyListing(null).subscribe((val: any) => {
      this.companies = val.details;
      this.loaderSvc.hideLoader();
    });
  }
  getAllCurrency(item) {
    this.loaderSvc.showLoader();
    this.AllCurrency = [];
    this.dashboardSvc.getUserCurrencyList(null).subscribe((val: any) => {
      this.AllCurrency = val.currency;
      this.loaderSvc.hideLoader();
      if (item) {
        this.openEdit(item)
      } else {
        this.openAdd();
      }
    });
  }

}
