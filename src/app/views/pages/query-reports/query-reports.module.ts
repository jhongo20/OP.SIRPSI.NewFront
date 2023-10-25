import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryReportsRoutingModule } from './query-reports-routing.module';
import { WorkerManagementConsultationComponent } from './worker-management-consultation/worker-management-consultation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { CompanyInformationFirstModule } from '../companies/update-company-data/company-information-first/company-information-first.module';
import { NgxMaskModule } from 'ngx-mask';
import { HistoryRemoveReinstateComponent } from './history-remove-reinstate/history-remove-reinstate.component';
import { ConsultationPsychosocialEvaluationValidityComponent } from './consultation-psychosocial-evaluation-validity/consultation-psychosocial-evaluation-validity.component';

@NgModule({
  declarations: [WorkerManagementConsultationComponent, HistoryRemoveReinstateComponent, ConsultationPsychosocialEvaluationValidityComponent],
  imports: [
    CommonModule,
    QueryReportsRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTooltipModule,
    FeatherIconModule,
    CompanyInformationFirstModule,
    MatOptionModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class QueryReportsModule {}
