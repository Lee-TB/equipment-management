import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Equipment } from '../../schemas/equipment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private endpoint = 'api/equipments/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  equipments: Equipment[] = [];
  dataSpource: [] = [];

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string
  ) {}

  getAll() {
    return this.http.get(this.baseURL + this.endpoint, this.httpOptions).pipe(
      tap((res: any) => {
        this.equipments = [res.data];
      })
    );
  }
}
