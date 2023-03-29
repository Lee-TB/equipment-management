import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
})
export class EquipmentFormComponent implements OnInit {
  currentPath: string = this.location.path();
  equipmentId!: number;
  formType?: 'new' | 'edit';
  equipmentFormGroup!: FormGroup;
  brands?: [];
  types?: [];

  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.equipmentFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      equipmentBrandDeviceTypeId: ['', [Validators.required]],
      equipmentBrandId: ['', [Validators.required]],
      specifications: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getTypes();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.formType = <'new' | 'edit'>this.currentPath.split('/')[2];
      }
    });
    this.formType = <'new' | 'edit'>this.currentPath.split('/')[2];

    /*fill data before when edit */
    if (this.formType === 'edit') {
      const routeParams = this.route.snapshot.paramMap;
      this.equipmentId = Number(routeParams.get('id'));
      this.equipmentService
        .getAnEquipment(this.equipmentId)
        .subscribe((value) => {
          const equipment = value.data[0];

          // get brands
          this.getBrands(equipment.equipmentBrandDeviceTypeId);

          this.equipmentFormGroup = this.formBuilder.group({
            name: [equipment.name, [Validators.required]],
            equipmentBrandDeviceTypeId: [
              equipment.equipmentBrandDeviceTypeId,
              [Validators.required],
            ],
            equipmentBrandId: [
              equipment.equipmentBrandId,
              [Validators.required],
            ],
            specifications: [equipment.specifications, [Validators.required]],
            image: [''],
          });
        });
    }
  }

  getBrands(deviceId: number) {
    this.equipmentService.getBrands(deviceId).subscribe((value: any) => {
      this.brands = value.data.map((row: any) => {
        return row;
      });
    });
  }

  onSelectDeviceType(event: Event) {
    const deviceId = Number((<HTMLSelectElement>event.target).value);
    this.getBrands(deviceId);
  }

  getTypes() {
    this.equipmentService.getTypes().subscribe((value: any) => {
      this.types = value.data.map((row: any) => {
        return row;
      });
    });
  }

  onSubmit() {
    if (this.equipmentFormGroup.valid) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(
        this.equipmentFormGroup.value
      )) {
        formData.append(key, <string>value);
      }

      if (this.formType === 'new') {
        this.equipmentService.addAnEquipment(formData).subscribe((res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(res);
            this.alertService.setType('success');
            this.alertService.setContent(res.message);
            this.alertService.setDuration(2000);
            this.router.navigate(['/equipments/table']);
          }
        });
      } else if (this.formType === 'edit') {
        this.equipmentService
          .updateAnEquipment(this.equipmentId, formData)
          .subscribe((res: any) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log(res);
              this.alertService.setType('success');
              this.alertService.setContent(res.message);
              this.alertService.setDuration(2000);
              this.router.navigate(['/equipments/table']);
            }
          });
      }
    }
  }

  /**Handle upload image */
  onUpload(event: Event) {
    this.equipmentFormGroup.patchValue({
      image: (<HTMLInputElement>event.target).files?.[0],
    });
  }
}
