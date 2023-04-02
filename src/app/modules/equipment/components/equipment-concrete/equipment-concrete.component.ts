import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/schemas/equipment';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AssignmentService } from 'src/app/shared/services/assignment/assignment.service';
import { ConcreteEquipmentServiceService } from 'src/app/shared/services/concrete-equipment/concrete-equipment-service.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';
import { formatCurrency } from 'src/app/shared/utils/formatCurency';
import { formatDate } from 'src/app/shared/utils/formatDate';

@Component({
  selector: 'app-equipment-concrete',
  templateUrl: './equipment-concrete.component.html',
  styleUrls: ['./equipment-concrete.component.css'],
})
export class EquipmentConcreteComponent implements OnInit {
  employeeId?: number;
  equipmentId?: number;
  equipment?: Equipment;
  concreteEquipmentId?: number;
  concreteEquipments?: [];
  price: string = '';
  openModal: boolean = false;
  expiredDate?: Date;

  constructor(
    @Inject('baseURL') public baseURL: string,
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private concreteEquipmentService: ConcreteEquipmentServiceService,
    private assignmentService: AssignmentService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.equipmentId = Number(routeParams.get('equipmentId'));
    this.employeeId = Number(routeParams.get('employeeId'));

    if (this.equipmentId) {
      this.getAnEquipment();
      this.getConcreteEquipments();
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

  getConcreteEquipments() {
    if (this.equipmentId) {
      this.concreteEquipmentService
        .getConcreteEquipmentsByEquipmentId(this.equipmentId)
        .subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.concreteEquipments = res.data.map((item: any) => {
              return {
                ...item,
                price: formatCurrency(item.price),
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
            this.getConcreteEquipments();
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
            this.getConcreteEquipments();
          }
        });
    }
  }

  assignAConcreteEquipment() {
    const assignData = {
      expiredAt: new Date(this.expiredDate || this.getToday()).toISOString(),
      userId: this.employeeId,
      concreteEquipmentId: this.concreteEquipmentId,
    };

    this.assignmentService
      .assignAConcreteEquipment(assignData)
      .subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.alertService.setType('success');
          this.alertService.setContent(res.message);
          this.alertService.setDuration(2000);
          this.getConcreteEquipments();
          this.openModal = false;
        }
      });
  }

  onDatePickerChange(event: Event) {
    this.expiredDate = new Date((<HTMLInputElement>event.target).value);
  }

  // for modal
  onClose() {
    this.openModal = false;
  }

  onOpen(concreteId: number) {
    this.concreteEquipmentId = concreteId;
    this.openModal = true;
  }

  getToday() {
    const today = new Date();
    const isoDate = today.toISOString().substring(0, 10);
    return isoDate;
  }
}
