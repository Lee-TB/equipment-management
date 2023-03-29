import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { tap } from 'rxjs';

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
    return this.http
      .get(
        this.baseURL +
          `api/users/paging?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        this.httpOptions
      )
      .pipe(tap((res: any) => {}));
  }

  getRoles() {
    return this.http
      .get(this.baseURL + `api/roles`, this.httpOptions)
      .pipe(tap((res: any) => {}));
  }

  getDepartments() {
    return this.http
      .get(this.baseURL + `api/departments`, this.httpOptions)
      .pipe(tap((res: any) => {}));
  }

  addAnEmployee(formData: FormData) {
    return this.http
      .post(this.baseURL + `api/auth/register`, formData)
      .pipe(tap((res: any) => {}));
  }
}
