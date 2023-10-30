import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { PsychosocialQuestionnaireComponent } from './psychosocial-questionnaire/psychosocial-questionnaire.component';

const routes: Routes = [
  {
    path: 'questionnair',
    component: PsychosocialQuestionnaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerPsychosocialEvaluationRoutingModule {}