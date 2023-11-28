import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadWorkerRoutingModule } from './download-worker-routing.module';
import { DownloadWorkerComponent } from './download-worker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import {
  NgbAccordionModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from '../generic-table/generic-table.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { ResultsIntraWorkFactorsQuestionnaireComponent } from '../Informes/results-intra-work-factors-questionnaire/results-intra-work-factors-questionnaire.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ResultsIntraWorkFactorsQuestionnaireFormBComponent } from '../Informes/results-intra-work-factors-questionnaire-form-b/results-intra-work-factors-questionnaire-form-b.component';
import { EvaluationStressQuestionnaireComponent } from '../Informes/evaluation-stress-questionnaire/evaluation-stress-questionnaire.component';
import { FactorsRiskExtraWorkQuestionnaireComponent } from '../Informes/factors-risk-extra-work-questionnaire/factors-risk-extra-work-questionnaire.component';

@NgModule({
  declarations: [
    DownloadWorkerComponent,
    ResultsIntraWorkFactorsQuestionnaireComponent,
    ResultsIntraWorkFactorsQuestionnaireFormBComponent,
    EvaluationStressQuestionnaireComponent,
    FactorsRiskExtraWorkQuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    DownloadWorkerRoutingModule,
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    MatSnackBarModule,
    GenericTableModule,
    NzToolTipModule,
    NgSelectModule,
    MatInputModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatOptionModule,
    MatTooltipModule,
    MatTabsModule,
    NgbModule,
    NzFormModule,
  ],
  exports: [DownloadWorkerComponent],
})
export class DownloadWorkerModule {}
