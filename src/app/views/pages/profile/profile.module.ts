import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordProfileComponent } from './change-password-profile/change-password-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangeDataProfileComponent } from './change-data-profile/change-data-profile.component';
import { NgxMaskModule } from 'ngx-mask';
import { ChangeEmailProfileComponent } from './change-email-profile/change-email-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordProfileComponent,
    ChangeDataProfileComponent,
    ChangeEmailProfileComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ProfileRoutingModule,
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
    MatTooltipModule,
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgxCaptchaModule,
    NgSelectModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class ProfileModule {}
