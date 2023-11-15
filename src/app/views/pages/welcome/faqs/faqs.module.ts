import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsComponent } from '../faqs/faqs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqsItemsComponent } from './faqs-items/faqs-items.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [FaqsComponent, FaqsItemsComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
    FaqsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
  ],
})
export class FaqsModule {}
