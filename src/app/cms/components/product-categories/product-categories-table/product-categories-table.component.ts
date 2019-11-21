import { Component, OnInit, Input } from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory.interface';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-product-categories-table',
  templateUrl: './product-categories-table.component.html',
  styleUrls: ['./product-categories-table.component.sass']
})
export class ProductCategoriesTableComponent implements OnInit {
  
  @Input('productCategories') public productCategories:ProductCategory;
  @Input('destroyProductCategory') public destroyProductCategory;
  @Input('toDelete') public toDelete;
  @Input('productCategoryService') public productCategoryService;

  constructor(
    private sharedService: SharedServiceService
  ) { }


  ngOnInit() {
  }


}
