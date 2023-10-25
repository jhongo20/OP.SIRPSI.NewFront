import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSerachResultComponent } from './card-serach-result.component';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [
    CardSerachResultComponent
  ],
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports: [
    CardSerachResultComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CardSerachResultModule { }
