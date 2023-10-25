import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationVariablesComponent } from './configuration-variables/configuration-variables.component';
import { RolesComponent } from './roles/roles.component';
import { RoutesComponent } from './routes/routes.component';
import { RoutesRoleComponent } from './routes-role/routes-role.component';
import { ConfigurationVariablesFormComponent } from './configuration-variables/configuration-variables-form/configuration-variables-form.component';
import { ValidationEmailVariableFormComponent } from './configuration-variables/validation-email-variable-form/validation-email-variable-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RolesFormComponent } from './roles/roles-form/roles-form.component';
import { RoutesFormComponent } from './routes/routes-form/routes-form.component';

@NgModule({
  declarations: [
    RoutesComponent,
    RolesComponent,
    RoutesRoleComponent,
    ConfigurationVariablesComponent,
    ConfigurationVariablesFormComponent,
    ValidationEmailVariableFormComponent,
    RolesFormComponent,
    RoutesFormComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MatTabsModule,
    GenericTableModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
})
export class ConfigurationModule {}
