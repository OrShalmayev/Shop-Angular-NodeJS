import { Component, OnInit } from '@angular/core';

import { ProductCategory} from '../../models/ProductCategory.interface';
import { ProductCategoryService } from '../../services/product_category_service/product-category.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public title:string = 'MyShop';
  public productCategories:ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService){}

  ngOnInit(){
      this.productCategoryService
        .getProductCategories()
        .subscribe((productCategoriesArr: ProductCategory[]) => {
          this.productCategories = productCategoriesArr;
        })

  }
}
