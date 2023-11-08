import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs.component';
import { FaqsItemsComponent } from './faqs-items/faqs-items.component';

const routes: Routes = [
  {
    path: '',
    component: FaqsComponent,
  },
  {
    path: 'items/:id',
    component: FaqsItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqsRoutingModule {}
