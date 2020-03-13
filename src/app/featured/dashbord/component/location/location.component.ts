import { AlertService } from './../../../../shared/services/alert.service';
import { LoaderService } from './../../../../shared/services/loader.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  showEdit: boolean;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc: boolean = true;
  column: string = 'id';
  direction: number;
  addedlocations: any;
  constructor(
    private dashboardSvc: DashbordService,
    private deleteMessageSvc: DeleteMessageService,
    private formGeneratorService: FormGeneratorService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.getAllLocation();
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    this.editFormData = item//this.formGeneratorService.editLocation(item);
    this.showEdit = true;
  }
  submitEdit(val) {
    this.showEdit = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateLocation(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: res.message, type: 'success' });
      this.getAllLocation();
    });

  }
  cancelEdit(val) {
    this.showEdit = false;

  }

  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteLocation(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteLocation({ locationid: val.LocationId }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: val.message, type: 'success' });
      this.getAllLocation();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }


  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.addLocation();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.createLocation(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      this.alert.showAlert({ message: res.message, type: 'success' });
      this.getAllLocation();
    });
  }

  getAllLocation() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.gerAllLocation(null).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.addedlocations = val.location_data;
    });
  }

}
