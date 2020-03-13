import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DeletePopupComponent implements OnInit {

  @ViewChild("deleteModal", { static: true }) input: ElementRef;
  @Input() details;
  @Output() deleteSubmitted = new EventEmitter<any>();
  @Output() deleteCancel = new EventEmitter<any>();
  modalRef: NgbModalRef;
  deleteItem: any;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.deleteItem = this.details;
    this.open(this.input);

  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title"
    });
  }
  onSubmit() {
    this.deleteSubmitted.emit(this.deleteItem.itemDetails);
    this.modalRef.close();
  }
  popupClose() {
    this.deleteCancel.emit(true);
    this.modalRef.close();
  }
}
