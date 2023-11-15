import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialsTrainingRoutingModule } from './tutorials-training-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskModule } from 'ngx-mask';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqsFormComponent } from './faqs-form/faqs-form.component';
import { QuillModule } from 'ngx-quill';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesFormComponent,
    FaqsComponent,
    FaqsFormComponent,
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    TutorialsTrainingRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatOptionModule,
    MatTooltipModule,
    FeatherIconModule,
    MatTabsModule,
    QuillModule.forRoot(), // ngx-quill
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class TutorialsTrainingModule {}
