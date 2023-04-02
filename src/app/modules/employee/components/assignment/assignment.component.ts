import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AssignmentService } from 'src/app/shared/services/assignment/assignment.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { formatCurrency } from 'src/app/shared/utils/formatCurency';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  employeeId?: number;
  employee?: any;
  borrowingId?: number;
  borrowings?: [];
  openModal: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private assignmentService: AssignmentService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    @Inject('baseURL') private baseURL: string
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.employeeId = Number(routeParams.get('id'));

    if (this.employeeId) {
      this.getAnEmployee();
      this.getBorrowingsByEmployeeId();
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
          }
        });
    }
  }

  private getBorrowingsByEmployeeId() {
    if (this.employeeId) {
      this.assignmentService
        .getBorrowingsByEmployeeId(this.employeeId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const formatedData = res.data.map((row: any) => {
              return {
                ...row,
                returnDate: formatDate(new Date(row.returnDate)),
                concreteEquipmentPrice: formatCurrency(
                  row.concreteEquipmentPrice
                ),
              };
            });
            const filteredData = formatedData.filter(
              (row: any) => row.statusOfConcreteEquipmentName === 'Borrowed'
            );

            this.borrowings = filteredData;
          }
        });
    }
  }

  RevokeThisConcreteEquipment() {
    if (this.borrowingId) {
      this.assignmentService
        .revokeAConcreteEquipment(this.borrowingId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(2000);
            this.getBorrowingsByEmployeeId();
            this.openModal = false;
          }
        });
    }
  }

  // for modal
  onClose() {
    this.openModal = false;
  }

  onOpen(borrowingId: number) {
    this.borrowingId = borrowingId;
    this.openModal = true;
  }
}
