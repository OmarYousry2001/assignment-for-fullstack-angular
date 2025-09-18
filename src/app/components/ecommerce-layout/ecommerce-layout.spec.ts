import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceLayout } from './ecommerce-layout';

describe('EcommerceLayout', () => {
  let component: EcommerceLayout;
  let fixture: ComponentFixture<EcommerceLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
