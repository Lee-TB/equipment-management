import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
})
export class EquipmentFormComponent implements OnInit {
  currentPath?: string;
  formType?: 'new' | 'edit';
  equipmentFormGroup!: FormGroup;
  brands?: [];
  types?: [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute
  ) {
    this.equipmentFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      equipmentBrandName: ['', [Validators.required]],
      equipmentBrandDeviceTypeName: ['', [Validators.required]],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.formType = <'new' | 'edit'>this.currentPath.split('/')[2];
      }
    });

    if ((this.formType = 'edit')) {
      const routeParams = this.route.snapshot.paramMap;
      const equipmentId = Number(routeParams.get('id'));
      this.equipmentService.getAnEquipment(equipmentId).subscribe((value) => {
        const equipment = value.data[0];
        console.log(equipment);
        this.equipmentFormGroup = this.formBuilder.group({
          name: [equipment.name || '', [Validators.required]],
          equipmentBrandName: [
            equipment.equipmentBrandName || '',
            [Validators.required],
          ],
          equipmentBrandDeviceTypeName: [
            equipment.equipmentBrandDeviceTypeName || '',
            [Validators.required],
          ],
          imageUrl: [''],
        });
      });
    }
  }

  getBrands() {
    this.equipmentService.getBrands().subscribe((value: any) => {
      this.brands = value.data.map((row: any) => {
        return row.name;
      });
    });
  }

  getTypes() {
    this.equipmentService.getTypes().subscribe((value: any) => {
      this.types = value.data.map((row: any) => {
        return row.name;
      });
    });
  }

  onSubmit() {
    console.log(this.equipmentFormGroup);
    if (this.equipmentFormGroup.valid) {
      console.log('form valid');
    }
  }
}
