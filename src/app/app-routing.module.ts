import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { AuthGuard } from './core/security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./views/pages/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./views/pages/welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/pages/users/users.module').then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./views/pages/account/account.module').then(
            (m) => m.AccountModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'work-centers',
        loadChildren: () =>
          import('./views/pages/work-centers/work-centers.module').then(
            (m) => m.WorkCentersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('./views/pages/companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration',
        loadChildren: () =>
          import('./views/pages/configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'query-reports',
        loadChildren: () =>
          import('./views/pages/query-reports/query-reports.module').then(
            (m) => m.QueryReportsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'psychosocial-evaluation',
        loadChildren: () =>
          import(
            './views/pages/psychosocial-evaluation/psychosocial-evaluation.module'
          ).then((m) => m.PsychosocialEvaluationModule),
        // canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/pages/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        // canActivate: [AuthGuard],
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./views/pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./views/pages/ui-components/ui-components.module').then(
            (m) => m.UiComponentsModule
          ),
      },
      {
        path: 'advanced-ui',
        loadChildren: () =>
          import('./views/pages/advanced-ui/advanced-ui.module').then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: 'form-elements',
        loadChildren: () =>
          import('./views/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () =>
          import(
            './views/pages/advanced-form-elements/advanced-form-elements.module'
          ).then((m) => m.AdvancedFormElementsModule),
      },
      {
        path: 'charts-graphs',
        loadChildren: () =>
          import('./views/pages/charts-graphs/charts-graphs.module').then(
            (m) => m.ChartsGraphsModule
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./views/pages/tables/tables.module').then(
            (m) => m.TablesModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/pages/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./views/pages/general/general.module').then(
            (m) => m.GeneralModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
