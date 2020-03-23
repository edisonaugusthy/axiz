import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from "./../../../../shared/services/form-generator.service";
import { Component, OnInit } from "@angular/core";
import { DashbordService } from "../../services/dashbord.service";
@Component({
  selector: "app-chain",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.css"]
})
export class CurrencyComponent implements OnInit {
  public showEdit = false;
  showAdd = false;
  popupData: any;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'id';
  direction: number;
  addedCurrency: any;
  searchText: any;
  detailsData: any;
  showDetaisl: boolean;
  public pagination: any;
  constructor(
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService,
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllcurrency();
  }

  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllcurrency();
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  openEdit(item?) {
    this.editFormData = item;
    //this.formGeneratorService.editChain(item);
    this.showEdit = true;
  }
  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.EditCurrency(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: val.message, type: 'success' });
      this.getAllcurrency();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }
  openView(item) {
    this.showDetaisl = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetaisl = false;
    this.detailsData = null;
  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteChain(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.DeleteCurrency({ id: val.id }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllcurrency();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }


  openAdd() {
    this.showAdd = true;
    // this.addFormData = this.formGeneratorService.AddChain();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.AddCurrency(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllcurrency();
    });
  }

  getAllcurrency() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getUserCurrencyList(this.pagination.currentPage).subscribe((val: any) => {
      this.addedCurrency = val.currency.data;
      this.loaderSvc.hideLoader();
      this.pagination.currentPage = val.currency.current_page;
      this.pagination.totalPages = val.currency.total;

    });
  }
}
