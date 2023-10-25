import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerManagementConsultationComponent } from './worker-management-consultation/worker-management-consultation.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { ConsultationPsychosocialEvaluationValidityComponent } from './consultation-psychosocial-evaluation-validity/consultation-psychosocial-evaluation-validity.component';

const routes: Routes = [
  {
    path: 'worker-management-consultation',
    component: WorkerManagementConsultationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultation-psychosocial-evaluation-validity',
    component: ConsultationPsychosocialEvaluationValidityComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryReportsRoutingModule {}
