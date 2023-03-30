import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string
  ) {}

  getBorrowingsByEmployeeId(userId: number) {
    return this.http.get(
      this.baseURL + `api/borrowings/users/${userId}`,
      this.httpOptions
    );
  }

  assignAConcreteEquipment(data: any) {
    return this.http.post(
      this.baseURL + `api/borrowings`,
      data,
      this.httpOptions
    );
  }
}
