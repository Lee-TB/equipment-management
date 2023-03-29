import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EmployeeRoutingModule],
  declarations: [
    EmployeePageComponent,
    EmployeeTableComponent,
    EmployeeFormComponent,
  ],
})
export class EmployeeModule {}
