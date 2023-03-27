import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';

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
        component: EquipmentFormComponent,
      },
      {
        path: 'edit/:id',
        component: EquipmentFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
