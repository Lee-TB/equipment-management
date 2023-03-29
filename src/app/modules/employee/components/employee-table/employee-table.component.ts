import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    /*Intilize state */
    this.getEmployees();
    if (this.pagingData) {
      this.getQueryParams();
      console.log(this.pagingData);
    }

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

  private getQueryParams() {
    this.activatedRoute.queryParams.subscribe((value) => {
      this.pageNumber = Number(value['pageNumber']);
    });
  }

  getEmployees() {
    this.employeeService
      .getEmloyeesByPaging(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.pagingData = res.data[0].metaData;
          console.log(this.pagingData);
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

  prevPage() {
    if (this.pagingData?.hasPrevious) {
      this.pageNumber--;
      this.getEmployees();
    }
  }

  nextPage() {
    if (this.pagingData?.hasNext) {
      this.pageNumber++;
      this.getEmployees();
    }
  }
}
