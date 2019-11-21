import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductCategoryComponent } from './create.component';
describe('CreateProductCategoryComponent', () => {
  let component: CreateProductCategoryComponent;
  let fixture: ComponentFixture<CreateProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
