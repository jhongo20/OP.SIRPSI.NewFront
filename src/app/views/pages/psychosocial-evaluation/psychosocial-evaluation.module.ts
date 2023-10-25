import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychosocialEvaluationRoutingModule } from './psychosocial-evaluation-routing.module';
import { PerformPsychosocialEvaluationComponent } from './perform-psychosocial-evaluation/perform-psychosocial-evaluation.component';


@NgModule({
  declarations: [
    PerformPsychosocialEvaluationComponent
  ],
  imports: [
    CommonModule,
    PsychosocialEvaluationRoutingModule
  ]
})
export class PsychosocialEvaluationModule { }
