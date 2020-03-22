import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from "./../../../../shared/services/form-generator.service";
import { Component, OnInit } from "@angular/core";
import { DashbordService } from "../../services/dashbord.service";
@Component({
  selector: "app-chain",
  templateUrl: "./chain.component.html",
  styleUrls: ["./chain.component.css"]
})
export class ChainComponent implements OnInit {
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
  addedChains: any;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  page = 4;
  pageSize = 10;
  constructor(
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService,
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.getAllChains();
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  pageChanged(item) {
    console.log(item);
  }
  openView(item) {
    this.showDetails = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }

  openEdit(item?) {
    this.editFormData = item;
    this.showEdit = true;
  }
  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateChain(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllChains();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }

  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteChain(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteChain({ chainid: val.ChainId }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllChains();
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
    this.dashboardSvc.createChain(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllChains();
    });
  }

  getAllChains() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.gerAllChain(null).subscribe((val: any) => {
      this.addedChains = val.chain_data;
      this.loaderSvc.hideLoader();

    });
  }
}
