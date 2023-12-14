import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { ContentAnimateDirective } from '../../core/content-animate/content-animate.directive';

import {
  NgbDropdownModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconModule } from '../../core/feather-icon/feather-icon.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PersonalInformationComponent } from 'src/app/shared/components/personal-information/personal-information.component';
import { SelectRoleMenuComponent } from 'src/app/shared/components/select-role-menu/select-role-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AccountRoutingModule } from '../pages/account/account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentAnimateDirective,
    PersonalInformationComponent,
    SelectRoleMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    FeatherIconModule,
    LoadingModule,
    HttpClientModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    NgSelectModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class LayoutModule {}
