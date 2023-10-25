import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { WorkerDataFormRoutingModule } from './worker-data-form-routing.module';
import { WorkerDataFormComponent } from './worker-data-form.component';

@NgModule({
  declarations: [WorkerDataFormComponent],
  imports: [
    CommonModule,
    WorkerDataFormRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgSelectModule,
    MatTooltipModule,
    MatDividerModule,
    FeatherIconModule,
    NgxMaskModule.forRoot({ validation: true }),
    MatTabsModule,
    MatRadioModule,
  ],
  exports: [WorkerDataFormComponent],
})
export class WorkerDataFormModule {}
