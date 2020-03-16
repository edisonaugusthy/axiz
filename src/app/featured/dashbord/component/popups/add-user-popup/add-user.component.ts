import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from '../../../../../../environments/environment.prod';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../utilities/must-match';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddUserComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;
  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
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
      userid: [(this.fields?.user_id || ''), Validators.required],
      username: [(this.fields?.user_name || ''), Validators.required],
      email: [(this.fields?.email || ''), [Validators.required, Validators.email]],
      password: [(this.fields?.password_ref || ''), Validators.required],
      confirmpassword: ['', Validators.required],
      status: [(this.fields?.status), Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      });
    this.open(this.input);
  }

  open(content) {
    this.isEdit = this.Edit;
    if (this.isEdit) {
      this.initSelection()
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid && this.selectedCompany) {
      let formVal = this.addUserForm.value;
      delete formVal['confirmpassword'];
      formVal.companyid = this.selectedCompany
      this.formSubmitted.emit(formVal);
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
    this.companyList.forEach(element => {
      element.checked = false;
    });
    val.checked = !val.checked;
    if (this.selectedCompany === val.CompanyID) {
      this.selectedCompany = null;
    } else {
      this.selectedCompany = val.CompanyID
    }

  }

  initSelection() {
    this.companyList.forEach(element => {
      element.checked = false;
      if (element.CompanyID == this.fields.companyid) {
        this.selectedCompany = element.CompanyID;
        element.checked = true;
      }
    });
  }

}
