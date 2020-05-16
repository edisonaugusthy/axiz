
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chain-details',
  templateUrl: './chain-details.component.html',
  styleUrls: ['./chain-details.component.css']
})
export class ChainDetailsComponent implements OnInit {

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
  fileData: any;
  imgUrl = `../assets/img/upload.png`;
  imageName: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.ChainId || '')],
      chainid: [(this.fields?.ChainId || ''), Validators.required],
      description: [(this.fields?.ChainName || ''), Validators.required],
      email: [(this.fields?.Email || ''), [Validators.required, Validators.email]],
      isvirtual: [((this.fields?.IsVirtualChain) ? true : false || false)],
      cgaontransac: [((this.fields?.cgaontransactions) || 0)],
      gcaonguestcount: [((this.fields?.gcaonguestcount) || 0)],
      image: [('')],
      chainlogo: [('')],
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

}
