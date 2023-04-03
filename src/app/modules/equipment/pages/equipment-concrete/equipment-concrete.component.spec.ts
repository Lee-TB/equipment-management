import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentConcreteComponent } from './equipment-concrete.component';

describe('EquipmentConcreteComponent', () => {
  let component: EquipmentConcreteComponent;
  let fixture: ComponentFixture<EquipmentConcreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentConcreteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentConcreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
