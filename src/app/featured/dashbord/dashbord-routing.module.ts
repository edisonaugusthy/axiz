import { CurrencyComponent } from './component/currency/currency.component';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { CostCenterAccessComponent } from './component/cost-center-access/cost-center-access.component';
import { UserComponent } from './component/user/user.component';
import { LocationComponent } from './component/location/location.component';
import { ChainComponent } from './component/chain/chain.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CompanyComponent } from './component/company/company.component';
import { UsersAdminComponent } from './component/users-admin/users-admin.component';
import { CompanyAccessComponent } from './component/company-access/company-access.component';
import { ConnectingPathComponent } from './component/connecting-path/connecting-path.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    children: [{
        path: 'chain',
        component: ChainComponent,
    }, {
        path: 'location',
        component: LocationComponent
    }, {
        path: 'user',
        component: UserComponent
    }, {
        path: 'cost-center-access',
        component: CostCenterAccessComponent
    }, {
        path: 'dashbord',
        component: DashbordComponent
    },
    {
        path: 'company',
        component: CompanyComponent
    }, {
        path: 'admin-user',
        component: UsersAdminComponent
    },
    {
        path: 'company-access',
        component: CompanyAccessComponent
    }, {
        path: 'connecting-path',
        component: ConnectingPathComponent
    },
    {
        path: 'currency',
        component: CurrencyComponent
    }]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
