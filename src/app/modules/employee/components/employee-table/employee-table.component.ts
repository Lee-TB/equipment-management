import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
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

  constructor(
    @Inject('baseURL') private baseURL: string,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmloyeesByPaging().subscribe((res) => {
      console.log(res.data[0]);
      this.dataSource = res.data[0].items.map((row: any) => {
        return {
          ...row,
          imageUrl: `${this.baseURL}/${row.imageUrl}`,
          updatedAt: formatDate(new Date(row.updatedAt)),
        };
      });
      console.log(this.dataSource);
    });
  }
}
