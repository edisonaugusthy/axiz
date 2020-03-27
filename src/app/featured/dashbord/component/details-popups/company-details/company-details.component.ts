import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from './../../../../../../environments/environment.prod';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;
  @Input() currency;
  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  imageName: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alert: AlertService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      companyid: [(this.fields?.CompanyID || ''), Validators.required],
      id: [(this.fields?.id || '')],
      companyname: [(this.fields?.CompanyName || ''), Validators.required],
      contact: [(this.fields?.Contact || ''), Validators.required],
      address1: [(this.fields?.Address1 || '')],
      address2: [(this.fields?.Address2 || '')],
      city: [(this.fields?.City || '')],
      country: [(this.fields?.Country || '')],
      phone: [(this.fields?.Phone1 || '')],
      fax: [(this.fields?.FaxNo || '')],
      email: [(this.fields?.Email || ''), [Validators.required, Validators.email]],
      website: [(this.fields?.Website || '')],
      currency: [(this.fields?.CurrencyId || ''), Validators.required],
      retainedaccount: [(this.fields?.RetainedAccountId || ''), Validators.required],
      accuretainedaccount: [(this.fields?.AccuRetainedAccountId || ''), Validators.required],
      erroraccount: [(this.fields?.SysErrorAccount || ''), Validators.required],
      errortolerance: [(this.fields?.SysErrorTolerance || ''), Validators.required],
      manual: [(this.fields?.ManualPath || ''), Validators.required],
      comm: [(this.fields?.CommPath || ''), Validators.required],
      postingtype: [(this.fields?.SopPostingType || ''), Validators.required],
      qtyminor: [(this.fields?.SopQtyMinor || ''), Validators.required],
      Image: [(this.fields?.Image)],
    });
    this.open(this.input);

  }

  open(content) {
    this.isEdit = this.Edit;
    if (this.isEdit) {
      this.addUserForm.patchValue(
        {
          qtyminor: this.fields.SopQtyMinor,
          currency: this.fields.CurrencyId,
          postingtype: this.fields.SopPostingType
        }
      );
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
  fileProgress(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result)
        this.addUserForm.patchValue({
          Image: reader.result,
        });
        this.addUserForm.get('Image').updateValueAndValidity();

      };
    }
  }

}
