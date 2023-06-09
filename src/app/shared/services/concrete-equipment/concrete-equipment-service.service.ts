import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConcreteEquipmentServiceService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string
  ) {}

  getConcreteEquipmentsByEquipmentId(equipmentId: number) {
    return this.http.get(
      this.baseURL + `api/concrete-equipments/equipments/${equipmentId}`
    );
  }

  addAnConcreteEquipment(data: any) {
    return this.http.post(this.baseURL + `api/concrete-equipments`, data);
  }

  removeAnConcreteEquipment(concreteId: number) {
    return this.http.delete(
      this.baseURL + `api/concrete-equipments/${concreteId}`,
      this.httpOptions
    );
  }
}
