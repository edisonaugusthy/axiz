import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.css']
})
export class EditDeleteButtonsComponent implements OnInit {
  @Input() data;
  @Output() onRemove = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  openEdit() {
    this.onEdit.emit(this.data);
  }
  openDelete() {
    this.onRemove.emit(this.data)
  }
}
