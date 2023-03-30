import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/shared/services/assignment/assignment.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  employeeId?: number;
  employee?: any;
  borrowings?: [];

  constructor(
    private employeeService: EmployeeService,
    private assignmentService: AssignmentService,
    private activatedRoute: ActivatedRoute,
    @Inject('baseURL') private baseURL: string
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.employeeId = Number(routeParams.get('id'));

    if (this.employeeId) {
      this.getAnEmployee();
      this.getBorrowingsByEmployeeId(this.employeeId);
    }
  }

  private getAnEmployee() {
    if (this.employeeId) {
      this.employeeService
        .getAnEmployee(this.employeeId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.employee = res.data[0];
            this.employee = {
              ...this.employee,
              imageUrl: this.baseURL + this.employee.imageUrl,
            };
            console.log(this.employee);
          }
        });
    }
  }

  private getBorrowingsByEmployeeId(employeeId: number) {
    this.assignmentService
      .getBorrowingsByEmployeeId(employeeId)
      .subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.borrowings = res.data.map((row: any) => {
            return {
              ...row,
              returnDate: formatDate(new Date(row.returnDate)),
            };
          });
          console.log(this.borrowings);
        }
      });
  }
}
