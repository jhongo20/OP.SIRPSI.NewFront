import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    loadChildren: () =>
      import(
        './manage-psychosocial-evaluation/manage-psychosocial-evaluation.module'
      ).then((m) => m.ManagePsychosocialEvaluationModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'worker',
    loadChildren: () =>
      import(
        './worker-psychosocial-evaluation/worker-psychosocial-evaluation.module'
      ).then((m) => m.WorkerPsychosocialEvaluationModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychosocialEvaluationRoutingModule { }
