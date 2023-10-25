import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancesPsychosocialEvaluationComponent } from './advances-psychosocial-evaluation/advances-psychosocial-evaluation.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { GenerateFiledEvaluationPsychosocialComponent } from './generate-filed-evaluation-psychosocial/generate-filed-evaluation-psychosocial.component';
import { SummonWorkersPsychosocialEvaluationComponent } from './summon-workers-psychosocial-evaluation/summon-workers-psychosocial-evaluation.component';

const routes: Routes = [
  {
    path: 'advances',
    component: AdvancesPsychosocialEvaluationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'generate-filed',
    component: GenerateFiledEvaluationPsychosocialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'summon-workers',
    component: SummonWorkersPsychosocialEvaluationComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePsychosocialEvaluationRoutingModule {}
