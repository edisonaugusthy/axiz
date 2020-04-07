import { AppConstants } from 'src/app/shared/constants/app-constants';
import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {
  showEdit: boolean;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'id';
  direction: number;
  addedlocations: any;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  Chains: any;
  @ViewChild('SearchInput', { static: false }) SearchInput: ElementRef;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  isSearching: boolean;
  constructor(
    private dashboardSvc: DashbordService,
    private deleteMessageSvc: DeleteMessageService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllLocation();
    this.getAllChains();
  }
  ngAfterViewInit() {
    this.searchUser();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllLocation();
  }
  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    this.editFormData = item//this.formGeneratorService.editLocation(item);
    this.showEdit = true;
  }
  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateLocation(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (res && res.status) {
        this.alert.showAlert({ message: res.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: res.message, type: 'danger' });
      }
      this.getAllLocation();
    });

  }
  cancelEdit(val) {
    this.showEdit = false;

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
    this.deleteData = this.deleteMessageSvc.deleteLocation(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteLocation({ locationid: val.LocationId }).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (res && res.status) {
        this.alert.showAlert({ message: res.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: res.message, type: 'danger' });
      }
      this.getAllLocation();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }


  openAdd() {
    this.showAdd = true;
    // this.addFormData = this.formGeneratorService.addLocation();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.createLocation(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (res && res.status) {
        this.alert.showAlert({ message: res.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: res.message, type: 'danger' });
      }
      this.getAllLocation();

    });
  }
  searchUser() {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(AppConstants.SEARCH_TIMEOUT),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.pagination.currentPage = 1;
      this.getAllLocation(text);
    });
  }
  getAllLocation(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.gerAllLocation(data).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.isSearching = false;
      this.addedlocations = val.location_data.data;
      this.pagination.currentPage = val.location_data.current_page;
      this.pagination.totalPages = val.location_data.total;
    });
  }

  getAllChains() {
    this.dashboardSvc.getAllChains(null).subscribe((val: any) => {
      this.Chains = val;
    });
  }
}
