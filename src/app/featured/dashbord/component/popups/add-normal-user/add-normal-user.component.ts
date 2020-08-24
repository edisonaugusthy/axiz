import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '../add-location-popup/add-location-popup.component';

@Component({
  selector: 'app-add-normal-user',
  templateUrl: './add-normal-user.component.html',
  styleUrls: ['./add-normal-user.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter }
  ],
})
export class AddNormalUserComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  addUserForm: FormGroup;
  isSubmitted: boolean;
  isEdit: boolean;
  fileData: any;
  imgUrl = `../assets/img/upload.png`;
  imageName: string;
  genderList = ['male', 'female', 'transgender']
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  startDate: { year: number; month: number; day: number; };
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder, dPconfig: NgbInputDatepickerConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
    const year = d.getFullYear();
    this.maxDate = { year: year, month: month, day: day };
    this.minDate = { year: (year - 100), month: 1, day: 1 }
    this.startDate = { year: year, month: 1, day: 1 };
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
      firstname: [(this.fields?.firstname || ''), Validators.required],
      lastname: [(this.fields?.lastname || ''), Validators.required],
      dob: [(this.fields?.dob || ''), Validators.required],
      gender: [(this.fields?.gender || ''), Validators.required],
      user_id: [(this.fields?.user_id || ''), [Validators.required, Validators.minLength(4)]],
      username: [(this.fields?.username || ''), Validators.required],
      user_email: [(this.fields?.user_email || ''), [Validators.required, Validators.email]],
      user_phone: [(this.fields?.user_phone || ''), [Validators.required, Validators.minLength(8)]],
      companyid: [(this.fields?.CompanyID || ''), Validators.required],
      password: [(''), (this.fields ? '' : Validators.required)],
      image: [('')],
      profilepic: [('')],
    });
    this.open(this.input);
  }

  checkIfCompanyLoaded() {
    this.companyList = this.companyList ?? []
    if (this.fields?.company?.length > 0) {
      for (let i = 0; i < this.fields.company.length; i++) {
        const element = this.fields.company[i];
        const index = this.companyList.findIndex(x => x.CompanyID === element.CompanyID);
        if (index === -1) {
          this.companyList.push(element)
        }
      }
    }
  }
  open(content) {
    if (this.fields) {
      this.isEdit = true;
      this.imgUrl = this.fields?.image ?? `../assets/img/upload.png`
      this.checkIfCompanyLoaded();
    }
    else {
      this.isEdit = false;
      this.addUserForm.get('profilepic').setValidators([Validators.required]);
    }
    this.addUserForm.get('profilepic').updateValueAndValidity();
    this.modalRef = this.modalService.open(content);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      this.formSubmitted.emit(this.addUserForm.value);
      this.modalRef.close();
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.addUserForm.controls;
  }


  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }


  fileProgress(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageName = file.name;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addUserForm.patchValue({
          image: reader.result,
          profilepic: reader.result
        });
        this.addUserForm.get('image').updateValueAndValidity();
        this.addUserForm.get('profilepic').updateValueAndValidity()
      };
    }
  }

}
