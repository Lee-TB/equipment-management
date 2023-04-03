import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentContainerComponent } from './equipment-container/equipment-container.component';
import { EquipmentTableComponent } from './pages/equipment-table/equipment-table.component';
import { EquipmentFormComponent } from './pages/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './pages/equipment-concrete/equipment-concrete.component';
import { EquipmentTypeComponent } from './pages/equipment-type/equipment-type.component';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: EquipmentContainerComponent,
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
      {
        path: 'type',
        component: EquipmentTypeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
