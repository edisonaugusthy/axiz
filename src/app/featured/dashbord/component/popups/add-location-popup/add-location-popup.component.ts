import { AlertService } from 'src/app/shared/services/alert.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Injectable,
  ViewEncapsulation
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';
  constructor(
    private datePipe: DatePipe
  ) {
    super();
  }
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const birthYear = Number(this.datePipe.transform(value, 'yyyy'));
      const birthMonth = Number(this.datePipe.transform(value, 'MM'));
      const birthDay = Number(this.datePipe.transform(value, 'dd'));
      // let date = value.split(this.DELIMITER);
      const val = {
        day: birthDay,
        month: birthMonth,
        year: birthYear
      };
      return val;
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}





@Component({
  selector: 'app-add-location-popup',
  templateUrl: './add-location-popup.component.html',
  styleUrls: ['./add-location-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter }
  ],
})
export class AddLocationPopupComponent implements OnInit {
  model: NgbDateStruct;
  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Input() chains;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  addUserForm: FormGroup;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  status = [{ id: 1, name: 'Yes' }, { id: 0, name: 'no' }]

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alert: AlertService, private datePipe: DatePipe,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
      chainid: [(this.fields?.ChainId || ''), Validators.required],
      locationid: [(this.fields?.LocationId || ''), Validators.required],
      Locationname: [(this.fields?.LocationName || '')],
      Contact: [(this.fields?.Contact || '')],
      address1: [(this.fields?.Address1 || '')],
      address2: [(this.fields?.Address2 || '')],
      city: [(this.fields?.City || '')],
      country: [(this.fields?.Country || '')],
      phone: [(this.fields?.Phone || '')],
      fax: [(this.fields?.Fax || '')],
      email: [(this.fields?.Email || '')],
      notes: [(this.fields?.Notes || '')],
      costcenter: [(this.fields?.CostCenter || '')],
      locationtype: [(this.fields?.LocationType || '')],
      inventory: [(this.fields?.UploadInv || 0), Validators.required],
      startdate: [(this.fields?.StartDate || null)],
      service: [(this.fields?.Service || '')],
      costcentertype: [(this.fields?.CostCenterType || '')],
      seats: [(this.fields?.Seats || ''), Validators.required],
      area: [(this.fields?.Area || '')],
      active: [(this.fields?.Active || 1), Validators.required],
      planned: [(this.fields?.Planned || 1), Validators.required],
      enablecutoff: [(this.fields?.EnableOrderCutoff || 0), Validators.required],
      ordercutof: [(this.fields?.OrderCutoff || '')],
    });
    this.open(this.input);
  }

  addDefaultDate() {
    if (this.fields?.StartDate) {
      const birthYear = Number(this.datePipe.transform(this.fields?.StartDate, 'yyyy'));
      const birthMonth = Number(this.datePipe.transform(this.fields?.StartDate, 'MM'));
      const birthDay = Number(this.datePipe.transform(this.fields?.StartDate, 'dd'));
      this.addUserForm.controls.startdate.setValue({
        year: birthYear,
        month: birthMonth,
        day: birthDay
      });
    }

  }


  open(content) {
    if (this.fields) {
      this.isEdit = true;
      // this.addDefaultDate();
    }
    else {
      this.isEdit = false;
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      this.formSubmitted.emit(this.addUserForm.value);
      this.modalRef.close();
      this.isSubmitted = false;
    } else {
      this.alert.showAlert({ message: 'Please Fill Remaining fields', type: 'error' });
    }
  }

  get formControls() {
    return this.addUserForm.controls;
  }


  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }

  selectCompany(val) {
    val.checked != val.checked;
    if (this.selectedCompany === val.CompanyID) {
      this.selectedCompany = null;
    } else {
      this.selectedCompany = val.CompanyID
    }
  }

  enabletime() {
    if (this.addUserForm.value.enablecutoff == true) {
      this.addUserForm.get('ordercutof').setValidators([Validators.required]);
      this.addUserForm.get('ordercutof').updateValueAndValidity();
    }
  }

}


