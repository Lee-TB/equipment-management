import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/schemas/equipment';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ConcreteEquipmentServiceService } from 'src/app/shared/services/concrete-equipment/concrete-equipment-service.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-equipment-concrete',
  templateUrl: './equipment-concrete.component.html',
  styleUrls: ['./equipment-concrete.component.css'],
})
export class EquipmentConcreteComponent implements OnInit {
  equipmentId?: number;
  equipment?: Equipment;
  concreteEquipments?: [];
  price: string = '';

  constructor(
    @Inject('baseURL') public baseURL: string,
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private concreteEquipmentService: ConcreteEquipmentServiceService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.equipmentId = Number(routeParams.get('id'));

    if (this.equipmentId) {
      this.getAnEquipment();
      this.getConcreteEquipment();
    }
  }

  getAnEquipment() {
    if (this.equipmentId) {
      this.equipmentService
        .getAnEquipment(this.equipmentId)
        .subscribe((res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.equipment = res.data[0];
          }
        });
    }
  }

  getConcreteEquipment() {
    if (this.equipmentId) {
      this.concreteEquipmentService
        .getConcreteEquipmentByEquipmentId(this.equipmentId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.concreteEquipments = res.data.map((item: any) => {
              return {
                ...item,
                createdAt:
                  (item.createdAt && formatDate(new Date(item.createdAt))) ||
                  'null',
                updatedAt:
                  (item.updatedAt && formatDate(new Date(item.updatedAt))) ||
                  'null',
              };
            });
          }
        });
    }
  }

  addConcrete() {
    if (Number(this.price) > 0) {
      const data = {
        price: this.price,
        equipmentId: this.equipmentId,
      };

      this.concreteEquipmentService
        .addAnConcreteEquipment(data)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(3000);
            this.getConcreteEquipment();
          }
        });
    }
  }

  removeConcreteEquipment(concreteId: number) {
    if (window.confirm('Are you sure?')) {
      this.concreteEquipmentService
        .removeAnConcreteEquipment(concreteId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(3000);
            this.getConcreteEquipment();
          }
        });
    }
  }
}
