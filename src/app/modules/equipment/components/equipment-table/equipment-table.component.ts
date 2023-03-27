import { Component, OnInit } from '@angular/core';
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  dataSource = [];

  constructor(private equipmentService: EquipmentService) {}

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
            photo: data.imageUrl,
            id: data.id,
          };
        });
        console.log(this.dataSource);
      }
    });
  }
}
