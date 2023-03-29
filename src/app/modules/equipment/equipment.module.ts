import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './components/equipment-concrete/equipment-concrete.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EquipmentRoutingModule],
  declarations: [
    EquipmentPageComponent,
    EquipmentTableComponent,
    EquipmentFormComponent,
    EquipmentConcreteComponent,
  ],
})
export class EquipmentModule {}
