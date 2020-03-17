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

@Component({
  selector: 'app-add-chain-popup',
  templateUrl: './add-chain-popup.component.html',
  styleUrls: ['./add-chain-popup.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddChainPopupComponent implements OnInit {

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
  imgUrl = `${environment.imageBase}/assets/img/upload.png`;
  imageName: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
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
    this.modalRef = this.modalService.open(content, { size: 'lg' });
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
          chainlogo: reader.result
        });
        this.addUserForm.get('image').updateValueAndValidity();
        this.addUserForm.get('chainlogo').updateValueAndValidity()
      };
    }
  }

}
