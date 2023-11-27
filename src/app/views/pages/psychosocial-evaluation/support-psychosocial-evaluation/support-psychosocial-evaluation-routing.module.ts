import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportPsychosocialEvaluationComponent } from './support-psychosocial-evaluation.component';

const routes: Routes = [
  { path: '', component: SupportPsychosocialEvaluationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPsychosocialEvaluationRoutingModule {}
