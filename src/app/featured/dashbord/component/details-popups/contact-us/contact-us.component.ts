import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsViewComponent implements OnInit {
  private modalRef: NgbModalRef;
  @ViewChild('contactUsPopup', { static: true }) input: ElementRef;

  @Input() fields;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.open(this.input);
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  onSubmit() {
    this.formSubmitted.emit(true);
    this.modalRef.close();
  }



  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }

}
