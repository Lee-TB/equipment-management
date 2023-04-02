import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { EquipmentConcreteComponent } from '../equipment/components/equipment-concrete/equipment-concrete.component';
import { AdminGuard } from 'src/app/shared/guards/admin/admin.guard';

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
        canActivate: [AdminGuard],
        component: EmployeeFormComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [AdminGuard],
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
