import { TestBed } from '@angular/core/testing';

import { ConcreteEquipmentServiceService } from './concrete-equipment-service.service';

describe('ConcreteEquipmentServiceService', () => {
  let service: ConcreteEquipmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcreteEquipmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
