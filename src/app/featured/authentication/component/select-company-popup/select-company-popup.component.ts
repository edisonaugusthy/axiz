import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { NgStorageService } from 'ng7-storage';

@Component({
  selector: 'app-select-company-popup',
  templateUrl: './select-company-popup.component.html',
  styleUrls: ['./select-company-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectCompanyPopupComponent implements OnInit {
  @ViewChild('content', { static: true }) input: ElementRef;
  private modalRef: NgbModalRef;
  @Output() onSelect = new EventEmitter<any>();
  @Input() companyList;
  status: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private authService: AuthService,
    private alertService: AlertService,
    private StorageService: NgStorageService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.status = this.companyList[0].CompanyID;
    this.modalRef = this.modalService.open(this.input);
  }
  closePopup() {
    if (this.status) {
      const userInfo = this.StorageService.getData('user_details');
      this.authService.setCompany({ companyid: this.status, user_id: userInfo.user_id }).subscribe(val => {
        this.onSelect.emit(true);
        this.modalRef.close();
      })
    } else {
      this.alertService.showAlert({ message: 'Please select a company to proceed..!', type: 'warning' });
    }

  }
}
