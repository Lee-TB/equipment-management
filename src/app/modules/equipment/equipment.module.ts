import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';

@NgModule({
  imports: [CommonModule, EquipmentRoutingModule],
  declarations: [
    EquipmentPageComponent,
    EquipmentTableComponent,
    TableComponent,
  ],
})
export class EquipmentModule {}
