import { CurrencyComponent } from './component/currency/currency.component';
import { DashboardRoutingModule } from './dashbord-routing.module';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SideNavigationComponent } from './component/side-navigation/side-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { CostCenterAccessComponent } from './component/cost-center-access/cost-center-access.component';
import { UserComponent } from './component/user/user.component';
import { LocationComponent } from './component/location/location.component';
import { ChainComponent } from './component/chain/chain.component';
import { CompanyComponent } from './component/company/company.component';
import { UsersAdminComponent } from './component/users-admin/users-admin.component';
import { CompanyAccessComponent } from './component/company-access/company-access.component';
import { ConnectingPathComponent } from './component/connecting-path/connecting-path.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './component/popups/add-user-popup/add-user.component';
import { AddChainPopupComponent } from './component/popups/add-chain-popup/add-chain-popup.component';
import { AddCompanyPopupComponent } from './component/popups/add-company-popup/add-company-popup.component';
import { AddCostCenterAccessComponent } from './component/popups/add-cost-center-access/add-cost-center-access.component';
import { AddLocationPopupComponent } from './component/popups/add-location-popup/add-location-popup.component';
import { AddCurrencyPopupComponent } from './component/popups/add-currency-popup/add-currency-popup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    Ng2SearchPipeModule,
    DashboardRoutingModule
  ],
  declarations: [
    HomeComponent,
    DashbordComponent,
    SideNavigationComponent,
    CostCenterAccessComponent,
    UserComponent,
    LocationComponent,
    ChainComponent,
    CompanyComponent,
    UsersAdminComponent,
    CompanyAccessComponent,
    ConnectingPathComponent,
    AddUserComponent,
    AddChainPopupComponent,
    AddCompanyPopupComponent,
    AddCostCenterAccessComponent,
    AddLocationPopupComponent,
    AddCurrencyPopupComponent,
    CurrencyComponent
  ],
  exports: [DashboardRoutingModule],
})
export class DashbordModule { }
