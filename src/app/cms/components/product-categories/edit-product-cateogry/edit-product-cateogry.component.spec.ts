import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductCateogryComponent } from './edit-product-cateogry.component';

describe('EditProductCateogryComponent', () => {
  let component: EditProductCateogryComponent;
  let fixture: ComponentFixture<EditProductCateogryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductCateogryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductCateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
