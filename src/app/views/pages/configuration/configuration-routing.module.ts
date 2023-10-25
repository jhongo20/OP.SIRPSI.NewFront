import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { RolesComponent } from './roles/roles.component';
import { RoutesComponent } from './routes/routes.component';
import { ConfigurationVariablesComponent } from './configuration-variables/configuration-variables.component';
import { RoutesRoleComponent } from './routes-role/routes-role.component';

const routes: Routes = [
  { path: '', redirectTo: 'routes', pathMatch: 'full' },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
  {
    path: 'variables',
    component: ConfigurationVariablesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'routes-role',
    component: RoutesRoleComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'routes/form/:id/:option',
  //   component: RoutesFormComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'routes/form/:id/:option',
  //   component: RoutesFormComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'route-role/form/:id/:role/:option',
  //   component: RouteRolesFormComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
