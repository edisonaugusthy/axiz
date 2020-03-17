import { environment } from '../../../../../../environments/environment.prod';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
      currencyid: [(this.fields?.CurrencyId || ''), Validators.required],
      currencydefault: [(this.fields?.CurrencyDefault || false), Validators.required],
      description: [(this.fields?.CurrencyName || ''), Validators.required],
      symbol: [(this.fields?.CurrencySymbol || ''), Validators.required],
      currencyunit: [(this.fields?.CurrencyUnit || ''), Validators.required],
      currencyconnect: [(this.fields?.CurrencyConnect || ''), Validators.required],
      currencysubunit: [(this.fields?.CurrencySubUnit || ''), Validators.required],
      currencyrate: [(this.fields?.CurrencyRate || ''), Validators.required],
      currencydecimals: [(this.fields?.Currencydecimals || ''), Validators.required],
    });
    this.open(this.input);
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    // this.isSubmitted = true;
    // if (this.addUserForm.valid) {
    //   this.formSubmitted.emit(this.addUserForm.value);
    //   this.modalRef.close();
    //   this.isSubmitted = false;
    // }
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

}
