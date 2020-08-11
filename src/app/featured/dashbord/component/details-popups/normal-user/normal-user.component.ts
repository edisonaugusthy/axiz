import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css']
})
export class NormalUserComponent implements OnInit {

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
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
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
      companyid: [(this.fields?.CompanyID?.join(',') || ''), Validators.required],
      password: [(''), (this.fields ? '' : Validators.required)],
      image: [('')],
      profilepic: [('')],
    });
    this.open(this.input);
    this.imgUrl = this.fields.image || `../assets/img/upload.png`;
  }

  open(content) {
    if (this.fields) {
      this.isEdit = true;
    }
    else {

      this.isEdit = false;

    }
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
