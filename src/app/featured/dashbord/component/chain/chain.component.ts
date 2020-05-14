import { AppConstants } from 'src/app/shared/constants/app-constants';
import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from "./../../../../shared/services/form-generator.service";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { DashbordService } from "../../services/dashbord.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  id: number;
  ChainId: string;
  ChainName: string;
  Operation: string;
}



@Component({
  selector: "app-chain",
  templateUrl: "./chain.component.html",
  styleUrls: ["./chain.component.css"]
})
export class ChainComponent implements OnInit, AfterViewInit {
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
  public pagination: any;
  displayedColumns = ['id', 'ChainId', 'ChainName', 'Operation'];
  public dataSource;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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

    this.getAllChains();
  }
  ngAfterViewInit() {
    this.searchUser();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllChains();
  }

  // sort(property) {
  //   this.isDesc = !this.isDesc;
  //   this.column = property;
  //   this.direction = this.isDesc ? 1 : -1;
  // }

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
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllChains(val);
      }

    })
  }
  getAllChains(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.gerAllChain(data).subscribe((val: any) => {
      this.addedChains = val.chain_data.data;
      this.loaderSvc.hideLoader();
      this.pagination.currentPage = val.chain_data.current_page;
      this.pagination.totalPages = val.chain_data.total;
      this.dataSource = new MatTableDataSource(this.addedChains);
      this.dataSource.sort = this.sort;
    });
  }
}
