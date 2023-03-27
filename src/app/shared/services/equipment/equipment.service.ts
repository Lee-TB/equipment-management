import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Equipment } from '../../schemas/equipment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  equipments: Equipment[] = [];
  dataSpource: [] = [];

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string
  ) {}

  getEquipments() {
    return this.http
      .get(this.baseURL + `api/equipments/`, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.equipments = [res.data];
        })
      );
  }

  getAnEquipment(equipmentId: number) {
    return this.http
      .get(this.baseURL + `api/equipments/${equipmentId}`, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.equipments = [res.data];
        })
      );
  }

  getBrands() {
    return this.http
      .get(this.baseURL + `api/equipment-brands/`, this.httpOptions)
      .pipe(
        tap((value) => {
          // console.log(value);
        })
      );
  }

  getTypes() {
    return this.http
      .get(this.baseURL + `api/device-types/`, this.httpOptions)
      .pipe(
        tap((value) => {
          // console.log(value);
        })
      );
  }
}
