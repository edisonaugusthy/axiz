import { AppConstants } from 'src/app/shared/constants/app-constants';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { AlertService } from '../../../../shared/services/alert.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, AfterViewInit {


  showDelete: boolean;
  deleteData: any;
  contactsRequstList: any;
  isDesc: boolean = true;
  column: string = 'user_id';
  direction: number;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  isSearching: boolean;
  scrollbarOptions = AppConstants.SCROLL_BAR_OPTIONS;
  constructor(
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private deleteMessageSvc: DeleteMessageService
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllEnquires();
  }
  ngAfterViewInit() {
    this.searchUser();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllEnquires();
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  openView(item) {
    this.detailsData = item;
    this.showDetails = true;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteEnquiry(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCompanyAccess({ enquiryId: val.id }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllEnquires();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }
  searchUser() {
    this.dashboardSvc.searchStr.subscribe(val => {
      if (val != null || val != undefined) {
        this.pagination.currentPage = 1;
        this.getAllEnquires(val);
      }
    })
  }
  // for listing details
  getAllEnquires(searchStr = '') {
    this.loaderSvc.showLoader();
    const data = {
      page: this.pagination.currentPage,
      search: searchStr
    }
    this.dashboardSvc.getContactUs(data).subscribe((val: any) => {
      if (val.status && val?.enquiry?.data) {
        this.contactsRequstList = val.enquiry.data;
        this.pagination.currentPage = val.enquiry.current_page;
        this.pagination.totalPages = val.enquiry.total;
      } else {
        this.contactsRequstList = [];
        this.pagination.totalPages = 0;
        this.pagination.currentPage = 0;
      }
      this.isSearching = false;
      this.loaderSvc.hideLoader();

    });
  }

}
