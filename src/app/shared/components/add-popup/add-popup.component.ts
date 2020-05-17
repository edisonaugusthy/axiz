
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
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddPopupComponent implements OnInit {
  private modalRef: NgbModalRef;
  @ViewChild('addModal', { static: true }) input: ElementRef;
  @Input() fields;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  form: FormGroup;
  payLoad: string;
  isSubmitted = false;
  header: string;
  buttonStr: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.header = this.fields.header;
    this.buttonStr = this.fields?.buttonText ?? 'Save';
    this.open(this.input);
    this.form = this.toFormGroup(this.fields.fields);
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'sm' });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const values = this.form.getRawValue();
      this.formSubmitted.emit(values);
      this.modalRef.close();
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }

  toFormGroup(questions) {
    const group: any = {};
    questions.forEach(question => {
      const key = (question.key.toUpperCase());
      if (question.required && key.includes('EMAIL')) {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: question.disabled }, [Validators.required, Validators.email])
      }
      else if (question.required && key.includes('MOBILE')) {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: question.disabled }, [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])
      }
      else if (question.required) {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: question.disabled }, Validators.required);
      }
      else {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: question.disabled });
      }
    });
    return new FormGroup(group);
  }

  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }
}
