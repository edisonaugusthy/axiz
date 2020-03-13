import { LoaderService } from 'src/app/shared/services/loader.service';
import { DashbordService } from './../../../services/dashbord.service';
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
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-add-cost-center-access',
  templateUrl: './add-cost-center-access.component.html',
  styleUrls: ['./add-cost-center-access.component.scss']
})
export class AddCostCenterAccessComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;

  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  chainsList: any;
  selectedChains: Array<object> = [];
  disableItem: boolean;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadData();
    this.addUserForm = this.formBuilder.group({
      userid: [(this.fields?.UserId || ''), Validators.required],
      username: [(this.fields?.ChainID || ''), Validators.required],
      Fullaccess: [1, Validators.required],
    });
    this.open(this.input);
  }

  open(content) {
    if (this.Edit) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    this.isSubmitted = true;
    this.getChains();
    if (this.addUserForm.valid && (this.addUserForm.value.Fullaccess == 1 || (this.addUserForm.value.Fullaccess == 0 &&
      this.selectedChains.length > 0))) {
      let val = this.addUserForm.getRawValue();
      val.selected = this.selectedChains;
      this.formSubmitted.emit(val);
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

  loadData() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getUserChainList(null).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.chainsList = val;
      this.onClick();
    });
  }


  onClick() {
    this.chainsList.forEach(element => {
      element.check = false;
      if (element.locations) {
        element.locations.forEach(val => {
          val.check = false;
        });
      }
    });

  }

  disableSelection(id) {
    if (id == 1) {
      this.chainsList.forEach(element => {
        element.check = false;
        if (element.locations) {
          element.locations.forEach(val => {
            val.check = false;
          });
        }
      });
      this.disableItem = true;
    } else {
      this.disableItem = false;
    }
  }

  update(item) {
    item.check = !item.check
  }
  getChains() {
    let item: any = {};
    for (let i = 0; i < this.chainsList.length; i++) {
      const element = this.chainsList[i];
      if (element.check) {
        item.chain = element.chainid
        item.locations = []
        for (let j = 0; j < element.locations.length; j++) {
          const innerItem = element.locations[j];
          if (innerItem.check) {
            item.locations.push(innerItem.id);
          }

        }
        this.selectedChains.push(item);
      }

    }

  }
}
