import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesTableComponent } from './product-categories-table.component';

describe('ProductCategoriesTableComponent', () => {
  let component: ProductCategoriesTableComponent;
  let fixture: ComponentFixture<ProductCategoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
