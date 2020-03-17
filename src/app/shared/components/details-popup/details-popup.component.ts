import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild("editModal", { static: true }) input: ElementRef;
  imageBase = environment.imageBase;
  @Input() fields;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  form: FormGroup;
  payLoad: string;
  isSubmitted = false;
  header: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.header = this.fields.header;
    this.open(this.input);
    this.form = this.toFormGroup(this.fields.fields);
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title"
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      //to include disabld field values
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
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: true }, [Validators.required, Validators.email])
      }
      else if (question.required && key.includes('MOBILE')) {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: true }, [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])
      }
      else if (question.required) {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: true }, Validators.required);
      }
      else {
        group[question.key] = new FormControl({ value: (question.value || ""), disabled: true });
      }
    });
    return new FormGroup(group);
  }

  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }
}
