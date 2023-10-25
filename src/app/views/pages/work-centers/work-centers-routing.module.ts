import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkCentersComponent } from './work-centers.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { LinkUnlinkUsersComponent } from '../companies/link-unlink-users/link-unlink-users.component';

const routes: Routes = [
  // { path: '', component: WorkCentersComponent, canActivate: [AuthGuard] },
  { path: '', component: WorkCentersComponent },
  {
    path: 'link-unlink-worker',
    component: LinkUnlinkUsersComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkCentersRoutingModule {}
