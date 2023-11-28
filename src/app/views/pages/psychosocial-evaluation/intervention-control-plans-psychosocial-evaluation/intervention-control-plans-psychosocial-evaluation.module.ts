import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionControlPlansPsychosocialEvaluationRoutingModule } from './intervention-control-plans-psychosocial-evaluation-routing.module';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { InterventionControlPlansPsychosocialEvaluationComponent } from './intervention-control-plans-psychosocial-evaluation.component';

@NgModule({
  declarations: [InterventionControlPlansPsychosocialEvaluationComponent],
  imports: [
    CommonModule,
    InterventionControlPlansPsychosocialEvaluationRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    NgbAccordionModule,
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
    MatOptionModule,
    MatTooltipModule,
    FeatherIconModule,
    MatTabsModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class InterventionControlPlansPsychosocialEvaluationModule {}
