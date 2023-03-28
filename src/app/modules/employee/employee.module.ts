import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';

@NgModule({
  imports: [CommonModule, EmployeeRoutingModule],
  declarations: [EmployeePageComponent],
})
export class EmployeeModule {}
