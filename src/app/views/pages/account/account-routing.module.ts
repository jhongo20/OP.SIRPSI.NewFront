import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'activate-user', component: ActivateUserComponent },
  {
    path: 'select-role',
    component: SelectRoleComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
