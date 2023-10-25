import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from '../companies/companies.component';
import { CompaniesFormComponent } from './companies-form/companies-form.component';
import { CompaniesUserComponent } from './companies-user/companies-user.component';
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
import { UpdateCompanyDataComponent } from './update-company-data/update-company-data.component';
import { UpdateCompanyDataModule } from './update-company-data/update-company-data.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { LinkUnlinkUsersComponent } from './link-unlink-users/link-unlink-users.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LinkUsersComponent } from './link-unlink-users/link-users/link-users.component';
import { UnlinkUsersComponent } from './link-unlink-users/unlink-users/unlink-users.component';
import { RemoveUserComponent } from './link-unlink-users/remove-user/remove-user.component';
import { ReinstateUserComponent } from './link-unlink-users/reinstate-user/reinstate-user.component';
import { CompanyInformationFirstModule } from './update-company-data/company-information-first/company-information-first.module';
import { CompaniesFormModule } from './companies-form/companies-form.module';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompaniesUserComponent,
    LinkUnlinkUsersComponent,
    LinkUsersComponent,
    UnlinkUsersComponent,
    RemoveUserComponent,
    ReinstateUserComponent,
  ],
  imports: [
    CommonModule,
    CompaniesFormModule,
    CompaniesRoutingModule,
    CompanyInformationFirstModule,
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
    MatOptionModule,
    MatTooltipModule,
    FeatherIconModule,
    UpdateCompanyDataModule,
    NgxMaskModule.forRoot({ validation: true }),
    MatTabsModule,
  ],
  exports: [CompaniesFormComponent],
})
export class CompaniesModule {}
