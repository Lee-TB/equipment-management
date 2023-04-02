import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { arrayFillIncrement } from 'src/app/shared/utils/arrayFillIncrement';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit {
  columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Photo',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Department',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: 'Date modified',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  dataSource?: [];
  pagingData?: {
    currentPage: number;
    firstRowOnPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  pages: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 4;

  constructor(
    @Inject('baseURL') private baseURL: string,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    /*Intilize state */
    this.getQueryParams();
    this.getEmployees();

    /*Pagination feature */
    this.paginate();
  }

  private paginate() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageNumber = Number(
          this.activatedRoute.snapshot.queryParamMap.get('pageNumber')
        );
        this.getEmployees();
      }
    });
  }

  prevPage() {
    if (this.pagingData?.hasPrevious) {
      return this.pagingData.currentPage - 1;
    }
    return this.pagingData?.currentPage;
  }

  nextPage() {
    if (this.pagingData?.hasNext) {
      return this.pagingData.currentPage + 1;
    }
    return this.pagingData?.currentPage;
  }

  private getQueryParams() {
    this.activatedRoute.queryParams.subscribe((value) => {
      const pageNumber = Number(value['pageNumber']);
      if (pageNumber) {
        this.pageNumber = pageNumber;
      }
    });
  }

  getEmployees() {
    this.employeeService
      .getEmloyeesByPaging(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.pagingData = res.data[0].metaData;
          if (this.pagingData) {
            this.pages = arrayFillIncrement(this.pagingData?.totalPages);
          }

          this.dataSource = res.data[0].items.map((row: any) => {
            return {
              ...row,
              imageUrl: `${this.baseURL}/${row.imageUrl}`,
              updatedAt: formatDate(new Date(row.updatedAt)),
            };
          });
        }
      });
  }

  removeEmployee(employeeId: number) {
    if (window.confirm('Are you sure?')) {
      this.employeeService.removeAnEmployee(employeeId).subscribe((res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.alertService.setType('success');
          this.alertService.setContent(res.message);
          this.alertService.setDuration(2000);

          this.getEmployees();
        }
      });
    }
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
