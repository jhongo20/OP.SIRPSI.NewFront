import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordProfileComponent } from './change-password-profile/change-password-profile.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { ChangeDataProfileComponent } from './change-data-profile/change-data-profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {
    path: 'change-password',
    component: ChangePasswordProfileComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'change-data',
    component: ChangeDataProfileComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: '',
  //   redirectTo: 'blank-page',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'blank-page',
  //   component: BlankComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
