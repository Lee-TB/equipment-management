import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: 'table',
    component: EquipmentTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
