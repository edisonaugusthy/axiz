import { LoginComponent } from './featured/authentication/component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'dashbord',
    canActivate: [AuthGuard],
    loadChildren: () => import('./featured/dashbord/dashbord.module').then(m => m.DashbordModule),
    data: { preload: true, delay: false, title: 'Dashbord' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
