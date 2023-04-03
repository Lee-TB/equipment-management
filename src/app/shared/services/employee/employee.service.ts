import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string
  ) {}

  getEmloyeesByPaging(pageNumber: number = 1, pageSize: number = 5) {
    return this.http.get(
      this.baseURL +
        `api/users/paging?PageNumber=${pageNumber}&PageSize=${pageSize}`,
      this.httpOptions
    );
  }

  getRoles() {
    return this.http.get(this.baseURL + `api/roles`, this.httpOptions);
  }

  getDepartments() {
    return this.http.get(this.baseURL + `api/departments`, this.httpOptions);
  }

  addAnEmployee(formData: FormData) {
    return this.http.post(this.baseURL + `api/auth/register`, formData);
  }

  updateAnEmployee(employeeId: number, formData: FormData) {
    return this.http.put(this.baseURL + `api/users/${employeeId}`, formData);
  }

  getAnEmployee(employeeId: number) {
    return this.http.get(this.baseURL + `api/users/${employeeId}`);
  }

  removeAnEmployee(employeeId: number) {
    return this.http.delete(
      this.baseURL + `api/users/${employeeId}`,
      this.httpOptions
    );
  }
}
