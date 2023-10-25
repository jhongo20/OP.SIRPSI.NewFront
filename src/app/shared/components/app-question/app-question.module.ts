import { NgModule } from '@angular/core';
import { QuestionComponent } from './app-question.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatRadioModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatOptionModule,
    FeatherIconModule,
    NgxMaskModule.forRoot({ validation: true }),
    MatTabsModule,
  ],
  exports: [QuestionComponent],
})
export class PreguntaModule {}
