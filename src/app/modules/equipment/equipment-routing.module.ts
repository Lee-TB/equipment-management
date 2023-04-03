import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentContainerComponent } from './equipment-container/equipment-container.component';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './components/equipment-concrete/equipment-concrete.component';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';
import { EquipmentTypeComponent } from './components/equipment-type/equipment-type.component';

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
