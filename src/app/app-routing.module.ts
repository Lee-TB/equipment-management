import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'equipments',
        loadChildren: () =>
          import('./modules/equipment/equipment.module').then(
            (m) => m.EquipmentModule
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
