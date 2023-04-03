import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentContainerComponent } from './equipment-container/equipment-container.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './components/equipment-concrete/equipment-concrete.component';
import { EquipmentTypeComponent } from './components/equipment-type/equipment-type.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EquipmentRoutingModule,
  ],
  declarations: [
    EquipmentContainerComponent,
    EquipmentFormComponent,
    EquipmentConcreteComponent,
    EquipmentTypeComponent,
  ],
})
export class EquipmentModule {}
