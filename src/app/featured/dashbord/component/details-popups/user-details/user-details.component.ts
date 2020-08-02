import { AlertService } from 'src/app/shared/services/alert.service';
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
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;
  statusList = [{ name: 'Active', val: 1 }, { name: 'Inactive', val: 0 }]
  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;
  addUserForm: FormGroup;
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
      status: [(this.fields?.status), Validators.required],
      companyid: [(this.fields?.companyid?.join(',')), Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmpassword')
      });
    this.open(this.input);
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }
  onSubmit() {
    this.formSubmitted.emit(this.addUserForm.value);
    this.modalRef.close();
    this.isSubmitted = false;

  }

  get formControls() {
    return this.addUserForm.controls;
  }


  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }






}
