import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterventionControlPlansPsychosocialEvaluationComponent } from './intervention-control-plans-psychosocial-evaluation.component';

const routes: Routes = [
  {
    path: '',
    component: InterventionControlPlansPsychosocialEvaluationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterventionControlPlansPsychosocialEvaluationRoutingModule {}
