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
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { SubSink } from 'subsink';

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
  @Input() users;
  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  chainsList: any;
  selectedChains: Array<object> = [];
  disableItem: boolean;
  private subs = new SubSink();
  formData: any;
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


  }
  activate() {
    this.formData = new FormArray(this.addControls(this.chainsList));
    this.addUserForm = this.formBuilder.group({
      userid: [(this.fields?.userid || ''), Validators.required],
      username: ['', Validators.required],
      Fullaccess: [1, Validators.required],
    });
    this.open(this.input);
    this.disableSelection(1);
  }


  parentCheckBoxSelect(control) {
    if (!this.canDoParentCheckBoxSelect(control)) return;
    const parent = control.parent.parent; // FormArray
    const markCheck = Object.keys(parent.controls).reduce((result, key) => {
      return [...result, parent.get(`${key}.check`).value];
    }, []).some(t => t);

    const grantParent = Object.keys(parent.parent.controls).find(x => parent.parent.controls[x] === parent);
    parent.parent.get('check').patchValue(markCheck, { emitEvent: false });
    this.parentCheckBoxSelect(parent);
  }

  childCheckBoxSelect(control, value) {
    const children = control.parent.get('locations') as FormArray;
    children.controls.forEach(group => {
      group.get('check').patchValue(value, { emitEvent: false });
      this.childCheckBoxSelect(group.get('check'), value);
    })
  }

  addControls(data) {
    return data.reduce((array, item) => {
      const group = new FormGroup({
        locations: new FormArray([])
      });
      const { locations = [], ...info } = item;
      this.addControls(locations)
        .forEach(t => (group.get('locations') as FormArray).push(t));

      Object.keys(info)
        .forEach(name => group.registerControl(name, this.generateControl(name, item[name])))

      return [...array, group];
    }, []);
  }


  private generateControl(name, defaultValue) {
    const control = new FormControl(defaultValue);
    if (name === 'check') {
      this.subs.add(
        control.valueChanges.subscribe(value => {
          this.childCheckBoxSelect(control, value);
          this.parentCheckBoxSelect(control);
        })
      );
    }
    return control;
  }

  private canDoParentCheckBoxSelect(control) {
    const parent = control.parent.parent;
    return (parent && parent.parent);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
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
    this.addUsername();
    this.selectedChains = this.getFinalCheckboxValues();
    this.isSubmitted = true;
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

  addUsername() {
    if (this.users && this.users.length > 0) {
      const user = this.users.filter(val => {
        return val.user_id == this.addUserForm.value.userid;
      })
      if (user && user.length > 0) {
        this.addUserForm.patchValue({ username: user[0].user_name })
      }
    }
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
      this.setinitialStatus();
      this.activate();
    });
  }


  setinitialStatus() {
    if (this.fields) {
      this.chainsList.forEach(element => {
        element = this.getSelectedChain(element);
      });
    } else {
      this.chainsList.forEach(element => {
        element.check = false;
        if (element.locations) {
          element.locations.forEach(val => {
            val.check = false;
          });
        }
      });
    }
  }
  getSelectedChain(item) {
    const selected = this.fields.selected || []
    let data = selected.filter(element => {
      return element.chain['Chain Id'] == item.chainid
    });
    data = data[0];
    if (data && data) {
      item.check = true;
      if (item.locations && item.locations.length > 0) {
        item.locations.map(val => {
          if (Array.isArray(data.chain['location Id'])) {
            data.chain['location Id'].includes(val.id) ? val.check = true : val.check = false
          } else {
            val.check = false;
          }
        })
      }
      return item;
    } else {

      item.check = false;
      if (item.locations && item.locations.length > 0) {
        item.locations.forEach(val => {
          val.check = false;
        })
      }
      return item;
    }

  }



  disableSelection(id) {
    if (id == 1) {
      this.formData.controls.forEach((element, i) => {
        element.get('check').patchValue(false);
        element.disable();
        element.get('locations').controls.forEach((val, i) => {
          val.get('check').patchValue(false);
          val.disable();
        })
      })
    } else {
      this.formData.controls.forEach((element, i) => {
        element.enable();
        element.get('locations').controls.forEach((val, i) => {
          val.enable();
        })
      })
    }
  }


  getFinalCheckboxValues() {
    const selected = [];
    this.formData.value.forEach(element => {
      if (element.check) {
        let item = { chain: element.chainid, locations: '' }
        if (element.locations && element.locations.length > 0) {
          let loc = element.locations.filter(val => {
            return val.check == true;
          }).map(obj => obj.id);
          item.locations = loc;
        }
        selected.push(item);
      }
    });
    return selected;
  }
}
