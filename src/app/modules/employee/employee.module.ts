import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EquipmentTableComponent } from '../equipment/pages/equipment-table/equipment-table.component';
import { EmployeePageComponent } from './employee-container/employee-container.component';
import { EmployeeTableComponent } from './pages/employee-table/employee-table.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';

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
