import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-type',
  templateUrl: './equipment-type.component.html',
  styleUrls: ['./equipment-type.component.css'],
})
export class EquipmentTypeComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private alertService: AlertService
  ) {}
  types?: [];
  typeName: string = '';

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.equipmentService.getTypes().subscribe((res: any) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        this.types = res.data;
      }
    });
  }

  addEquipmentType() {
    if (this.typeName) {
      const data = {
        name: this.typeName,
      };
      this.equipmentService.addAType(data).subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.alertService.setType('success');
          this.alertService.setContent(res.message);
          this.alertService.setDuration(2000);
          this.getTypes();
        }
      });
    }
  }

  removeType(typeId: number) {
    if (window.confirm('Are you sure?')) {
      this.equipmentService.removeAType(typeId).subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.alertService.setType('success');
          this.alertService.setContent(res.message);
          this.alertService.setDuration(2000);
          this.getTypes();
        }
      });
    }
  }
}
