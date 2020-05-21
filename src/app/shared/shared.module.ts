import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DetailsPopupComponent } from './components/details-popup/details-popup.component';
import { MaterialModuleModule } from './material-module.module';
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./components/alert/alert.component";
import { EditPopupComponent } from "./components/edit-popup/edit-popup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddPopupComponent } from "./components/add-popup/add-popup.component";
import { DeletePopupComponent } from "./components/delete-popup/delete-popup.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderrByPipe } from './pipes/orderr-by.pipe';
import { NoDataComponent } from './components/no-data/no-data.component';
import { NumberDirective } from './directives/number.directive';
import { EditDeleteButtonsComponent } from './components/edit-delete-buttons/edit-delete-buttons.component';
import { AddButtonComponent } from './components/add-button/add-button.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, MaterialModuleModule],
  declarations: [
    LoaderComponent,
    HeaderComponent,
    AlertComponent,
    EditPopupComponent,
    DeletePopupComponent,
    AddPopupComponent,
    OrderrByPipe,
    NoDataComponent,
    DetailsPopupComponent,
    NumberDirective,
    SearchBoxComponent,
    EditDeleteButtonsComponent,
    AddButtonComponent
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    EditPopupComponent,
    DeletePopupComponent,
    AddPopupComponent,
    AlertComponent,
    OrderrByPipe,
    NoDataComponent,
    DetailsPopupComponent,
    NumberDirective,
    SearchBoxComponent,
    EditDeleteButtonsComponent,
    AddButtonComponent
  ]
})
export class SharedModule { }
