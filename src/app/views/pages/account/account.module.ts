import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    RestorePasswordComponent,
    ResetPasswordComponent,
    SelectRoleComponent,
    LoginComponent,
    ActivateUserComponent,
  ],
  imports: [
    // BrowserAnimationsModule,
    // HttpModule,
    LoadingModule,
    HttpClientModule,
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    NgxCaptchaModule,
    MatTooltipModule,
    NgSelectModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class AccountModule {}
