import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { EquipmentService } from 'src/app/shared/services/equipment/equipment.service';
import { arrayFillIncrement } from 'src/app/shared/utils/arrayFillIncrement';

@Component({
  selector: 'app-equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent implements OnInit {
  @Input() isTableToAssign: boolean = false;

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
  pagingData?: {
    currentPage: number;
    firstRowOnPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  pages: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(
    private equipmentService: EquipmentService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('baseURL') private baseURL: string
  ) {}

  ngOnInit(): void {
    /*Intilize state */
    this.getQueryParams();
    this.getEquipments();

    /*Pagination feature */
    this.paginate();
  }

  private paginate() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageNumber = Number(
          this.activatedRoute.snapshot.queryParamMap.get('pageNumber')
        );
        this.getEquipments();
      }
    });
  }

  prevPage() {
    if (this.pagingData?.hasPrevious) {
      return this.pagingData.currentPage - 1;
    }
    return this.pagingData?.currentPage;
  }

  nextPage() {
    if (this.pagingData?.hasNext) {
      return this.pagingData.currentPage + 1;
    }
    return this.pagingData?.currentPage;
  }

  private getQueryParams() {
    this.activatedRoute.queryParams.subscribe((value) => {
      const pageNumber = Number(value['pageNumber']);
      if (pageNumber) {
        this.pageNumber = pageNumber;
      }
    });
  }

  private getEquipments() {
    this.equipmentService
      .getEquipmentsByPaging(this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.pagingData = res.data[0].metaData;
          if (this.pagingData) {
            this.pages = arrayFillIncrement(this.pagingData?.totalPages);
          }

          this.dataSource = res.data[0].items.map((data: any) => {
            return {
              name: data.name,
              brand: data.equipmentBrandName,
              type: data.equipmentBrandDeviceTypeName,
              photo: this.baseURL + data.imageUrl,
              id: data.id,
              desc: data.specifications,
            };
          });
        }
      });
  }

  removeEquipment(equipmentId: number) {
    if (window.confirm('Are your sure?')) {
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
}
