import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-normal-user',
  templateUrl: './add-normal-user.component.html',
  styleUrls: ['./add-normal-user.component.css']
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
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
      userid: [(this.fields?.user_id || ''), Validators.required],
      username: [(this.fields?.user_name || ''), Validators.required],
      email: [(this.fields?.user_email || ''), [Validators.required, Validators.email]],
      mobile: [(this.fields?.user_phone || ''), Validators.required],
      udid: [(this.fields?.UDID || ''), Validators.required],
      loginpin: [(this.fields?.LoginPin || ''), Validators.required],
      image: [('')],
      profilepic: [('')],
    });
    this.open(this.input);
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
