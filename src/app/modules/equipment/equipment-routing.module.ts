import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './components/equipment-concrete/equipment-concrete.component';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: EquipmentPageComponent,
    children: [
      {
        path: 'table',
        component: EquipmentTableComponent,
      },
      {
        path: 'new',
        canActivate: [AdminGuard],
        component: EquipmentFormComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [AdminGuard],
        component: EquipmentFormComponent,
      },
      {
        path: 'concrete/:equipmentId',
        component: EquipmentConcreteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
