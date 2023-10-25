import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersCompanyComponent } from './users-company/users-company.component';
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
import { ActivateInactiveUsersComponent } from './activate-inactive-users/activate-inactive-users.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { UsersCompanyNotAffiliatedComponent } from './users-company-not-affiliated/users-company-not-affiliated.component';
import { BulkUserAssignmenFormComponent } from './bulk-user-assignmen-form/bulk-user-assignmen-form.component';
import { RegisterNewUsersComponent } from './register-new-users/register-new-users.component';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterNewWorkerComponent } from './register-new-worker/register-new-worker.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateWorkerDataComponent } from './update-worker-data/update-worker-data.component';
import { UpdatePsychologistDataComponent } from './update-psychologist-data/update-psychologist-data.component';
import { OccupationalLicenseComponent } from './update-psychologist-data/occupational-license/occupational-license.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { WorkerDataFormModule } from 'src/app/shared/components/worker-data-form/worker-data-form.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersCompanyComponent,
    ActivateInactiveUsersComponent,
    UsersCompanyNotAffiliatedComponent,
    BulkUserAssignmenFormComponent,
    RegisterNewUsersComponent,
    RegisterNewWorkerComponent,
    UpdateWorkerDataComponent,
    UpdatePsychologistDataComponent,
    OccupationalLicenseComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
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
    WorkerDataFormModule,
  ],
})
export class UsersModule {}
