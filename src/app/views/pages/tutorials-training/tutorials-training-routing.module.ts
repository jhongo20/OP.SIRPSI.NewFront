import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { FaqsFormComponent } from './faqs-form/faqs-form.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faqs/create',
    component: FaqsFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faqs/:id/edit',
    component: FaqsFormComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialsTrainingRoutingModule {}
