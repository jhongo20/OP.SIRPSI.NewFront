import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychosocialEvaluationRoutingModule } from './psychosocial-evaluation-routing.module';
import { InterventionControlPlansPsychosocialEvaluationComponent } from './intervention-control-plans-psychosocial-evaluation/intervention-control-plans-psychosocial-evaluation.component';

@NgModule({
  declarations: [
    InterventionControlPlansPsychosocialEvaluationComponent
  ],
  imports: [CommonModule, PsychosocialEvaluationRoutingModule],
})
export class PsychosocialEvaluationModule {}
