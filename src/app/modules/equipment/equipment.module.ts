import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { EquipmentConcreteComponent } from './components/equipment-concrete/equipment-concrete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EquipmentRoutingModule,
  ],
  declarations: [
    EquipmentPageComponent,
    EquipmentFormComponent,
    EquipmentConcreteComponent,
  ],
})
export class EquipmentModule {}
