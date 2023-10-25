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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { UpdateCompanyDataComponent } from './update-company-data.component';
import { UpdateCompanyDataRoutingModule } from './update-company-data-routing.module';
import { CompanyInformationSecondComponent } from './company-information-second/company-information-second.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompanyInformationFirstModule } from './company-information-first/company-information-first.module';

@NgModule({
  declarations: [UpdateCompanyDataComponent, CompanyInformationSecondComponent],
  imports: [
    CommonModule,
    UpdateCompanyDataRoutingModule,
    CommonModule,
    MatSnackBarModule,
    GenericTableModule,
    NgSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
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
export class UpdateCompanyDataModule {}
