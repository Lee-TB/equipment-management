import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LogoutComponent } from './shared/components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'equipments',
        loadChildren: () =>
          import('./modules/equipment/equipment.module').then(
            (m) => m.EquipmentModule
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./modules/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'assignments',
        loadChildren: () =>
          import('./modules/assignment/assignment.module').then(
            (m) => m.AssignmentModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
