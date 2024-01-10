import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialsTrainingRoutingModule } from './tutorials-training-routing.module';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TutorialsTrainingRoutingModule,
    NzMessageModule,
  ]
})
export class TutorialsTrainingModule { }
