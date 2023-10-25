import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
