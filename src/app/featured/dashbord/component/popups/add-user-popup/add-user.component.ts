import { AlertService } from 'src/app/shared/services/alert.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../utilities/must-match';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal],
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
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  statusList = [{ name: 'Active', val: 1 }, { name: 'Inactive', val: 0 }]
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
      id: [(this.fields?.id || '')],
      userid: [(this.fields?.user_id || ''), [Validators.required, Validators.minLength(4)]],
      username: [(this.fields?.user_name || ''), Validators.required],
      email: [(this.fields?.email || ''), [Validators.required, Validators.email]],
      password: [(this.fields?.password_ref || ''), Validators.required],
      confirmpassword: ['', Validators.required],
      status: [(this.fields?.status || 1), Validators.required],
      companyid: [(this.fields?.companyid.split(',') || null), Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      });
    this.open(this.input);
  }

  open(content) {
    this.isEdit = this.Edit;
    if (this.isEdit) {
      this.addUserForm.patchValue({ confirmpassword: this.fields?.password_ref })
    }
    this.modalRef = this.modalService.open(content);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      let formVal = this.addUserForm.value;
      delete formVal['confirmpassword'];
      formVal.companyid = formVal.companyid.join(',');
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





}
