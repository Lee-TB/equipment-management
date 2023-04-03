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
  brands?: [];
  typeName: string = '';
  brandName: string = '';
  typeId?: number;

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

  addEquipmentBrand() {
    if (this.brandName) {
      const blob = new Blob([], { type: 'image/jpeg' });
      const file = new File([blob], 'empty_image.jpg', { type: 'image/jpeg' });

      const data = {
        name: this.brandName,
        image: file,
        deviceTypeId: this.typeId,
        description: 'null',
      };

      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, <string>value);
      }

      this.equipmentService.addABrand(formData).subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.alertService.setType('success');
          this.alertService.setContent(res.message);
          this.alertService.setDuration(2000);
          this.getBrands();
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

  showBrands(typeId: number) {
    this.typeId = typeId;
    if (this.typeId) {
      this.getBrands();
    }
  }

  getBrands() {
    if (this.typeId) {
      this.equipmentService.getBrands(this.typeId).subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.brands = res.data;
        }
      });
    }
  }

  removeBrand(brandId: number) {
    if (brandId) {
      if (window.confirm('Are you sure?')) {
        this.equipmentService.removeABrand(brandId).subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(2000);
            this.getBrands();
          }
        });
      }
    }
  }
}
