import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesFormComponent } from './companies-form.component';
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
import { MatIconModule } from '@angular/material/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [CompaniesFormComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
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
    NzLayoutModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
    MatTabsModule,
    MatRadioModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
  exports: [CompaniesFormComponent],
})
export class CompaniesFormModule {}
