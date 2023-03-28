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
      .pipe(tap((res: any) => {}));
  }

  addAnEquipment(data: any) {
    return this.http
      .post(this.baseURL + `api/equipments/`, data)
      .pipe(tap((res: any) => {}));
  }

  updateAnEquipment(equipmentId: number, data: any) {
    return this.http
      .put(this.baseURL + `api/equipments/${equipmentId}`, data)
      .pipe(tap((res: any) => {}));
  }

  removeAnEquipment(equipmentId: number) {
    return this.http
      .delete(this.baseURL + `api/equipments/${equipmentId}`, this.httpOptions)
      .pipe(tap((res: any) => {}));
  }

  getBrands(deviceId: number) {
    return this.http
      .get(
        this.baseURL + `api/equipment-brands/device-types/${deviceId}`,
        this.httpOptions
      )
      .pipe(tap((value) => {}));
  }

  getTypes() {
    return this.http
      .get(this.baseURL + `api/device-types/`, this.httpOptions)
      .pipe(tap((value) => {}));
  }
}
