import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentConcreteComponent } from '../equipment/pages/equipment-concrete/equipment-concrete.component';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';
import { EmployeePageComponent } from './employee-container/employee-container.component';
import { EmployeeTableComponent } from './pages/employee-table/employee-table.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: EmployeePageComponent,
    children: [
      {
        path: 'table',
        component: EmployeeTableComponent,
      },
      {
        path: 'new',
        canMatch: [AdminGuard],
        component: EmployeeFormComponent,
      },
      {
        path: 'edit/:id',
        canMatch: [AdminGuard],
        component: EmployeeFormComponent,
      },
      {
        path: 'assign/:id',
        redirectTo: 'assign/:id/table',
        pathMatch: 'full',
      },
      {
        path: 'assign/:id/table',
        component: AssignmentComponent,
      },
      {
        path: 'assign/:employeeId/concrete/:equipmentId',
        component: EquipmentConcreteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
