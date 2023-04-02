import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  currentPath = this.location.path();
  formType?: 'new' | 'edit';
  roles?: [];
  departments?: [];
  employeeId?: number;

  formGroup?: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private emloyeeService: EmployeeService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getDepartments();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.formType = <'new' | 'edit'>this.currentPath.split('/')[2];
      }
    });
    this.formType = <'new' | 'edit'>this.currentPath.split('/')[2];

    if (this.formType === 'new') {
      this.formGroup = this.formBuilder.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        roleId: ['', [Validators.required]],
        departmentId: ['', [Validators.required]],
        image: ['', [Validators.required]],
      });
    }

    /*fill data before when edit */
    if (this.formType === 'edit') {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.employeeId = Number(routeParams.get('id'));

      if (this.employeeId) {
        this.emloyeeService.getAnEmployee(this.employeeId).subscribe((res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const employee = res.data[0];
            this.formGroup = this.formBuilder.group({
              fullName: [employee.fullName, [Validators.required]],
              email: [employee.email, [Validators.required, Validators.email]],
              phoneNumber: [employee.phoneNumber, [Validators.required]],
              image: [employee.image],
            });
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.formGroup?.valid) {
      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(this.formGroup.value)) {
        formData.append(key, <string>value);
      }

      if (this.formType === 'new') {
        this.emloyeeService.addAnEmployee(formData).subscribe((res: any) => {
          console.log(res);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(2000);
            this.location.back();
          }
        });
      } else if (this.formType === 'edit' && this.employeeId) {
        this.emloyeeService
          .updateAnEmployee(this.employeeId, formData)
          .subscribe((res: any) => {
            console.log(res);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              this.alertService.setType('success');
              this.alertService.setContent(res.message);
              this.alertService.setDuration(2000);
              this.location.back();
            }
          });
      }
    }
  }

  /**Handle upload image */
  onUpload(event: Event) {
    this.formGroup?.patchValue({
      image: (<HTMLInputElement>event.target).files?.[0],
    });
  }

  getRoles() {
    this.emloyeeService.getRoles().subscribe((res) => {
      if (res.statusCode === 200) {
        this.roles = res.data;
      }
    });
  }

  getDepartments() {
    this.emloyeeService.getDepartments().subscribe((res) => {
      if (res.statusCode === 200) {
        this.departments = res.data;
      }
    });
  }
}
