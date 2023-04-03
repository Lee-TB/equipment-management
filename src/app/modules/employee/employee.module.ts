import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { EquipmentTableComponent } from '../equipment/pages/equipment-table/equipment-table.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EmployeeRoutingModule],
  declarations: [
    EmployeePageComponent,
    EmployeeTableComponent,
    EmployeeFormComponent,
    AssignmentComponent,
    EquipmentTableComponent,
  ],
})
export class EmployeeModule {}
