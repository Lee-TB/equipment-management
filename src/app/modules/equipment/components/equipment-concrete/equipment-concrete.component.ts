import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/schemas/equipment';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-concrete',
  templateUrl: './equipment-concrete.component.html',
  styleUrls: ['./equipment-concrete.component.css'],
})
export class EquipmentConcreteComponent implements OnInit {
  equipmentId?: number;
  equipment?: Equipment;

  constructor(
    @Inject('baseURL') public baseURL: string,
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.equipmentId = Number(routeParams.get('id'));

    if (this.equipmentId) {
      this.equipmentService
        .getAnEquipment(this.equipmentId)
        .subscribe((res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this.equipment = res.data[0];
            console.log(this.equipment);
          }
        });
    }
  }
}
