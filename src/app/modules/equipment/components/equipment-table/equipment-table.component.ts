import { Component, Inject, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';

@Component({
  selector: 'app-equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent implements OnInit {
  columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  dataSource = [];

  constructor(
    private equipmentService: EquipmentService,
    private alertService: AlertService,
    @Inject('baseURL') private baseURL: string
  ) {}

  ngOnInit(): void {
    this.getEquipments();
  }

  private getEquipments() {
    this.equipmentService.getEquipments().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.dataSource = res.data.map((data: any) => {
          return {
            name: data.name,
            brand: data.equipmentBrandName,
            type: data.equipmentBrandDeviceTypeName,
            photo: this.baseURL + data.imageUrl,
            id: data.id,
            desc: data.specifications,
          };
        });
        console.log(this.dataSource);
      }
    });
  }

  removeEquipment(equipmentId: number) {
    this.equipmentService.removeAnEquipment(equipmentId).subscribe((res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        this.alertService.setType('success');
        this.alertService.setContent(res.message);
        this.alertService.setDuration(2000);

        // call request update view
        this.getEquipments();
      }
    });
  }
}
