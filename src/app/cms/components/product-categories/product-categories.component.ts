import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

// Models
import { ProductCategory } from '../../../models/ProductCategory.interface';
import { ProductCategoryService } from 'src/app/services/product_category_service/product-category.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.sass']
})
export class ProductCategoriesComponent implements OnInit, OnChanges {
  /**@Properties */ 
 
  //properties for page header
  public headerIconInput = 'category';
  public headerTitleInput = 'Product Categories';
  public headerTextInput = 'Curabitur ullamcorper ultricies nisi. Cras sagittis. Fusce ac felis sit amet ligula pharetra condimentum.';
  public headerButtonDescription = 'Product Category';
  
  public productCategories;
  public toDelete:boolean = false;
 
  constructor(
    private productCategoryService: ProductCategoryService, 
    private router: Router,
    private sharedService: SharedServiceService
    ) {

      }
  
  ngOnChanges(changes: SimpleChanges){
    console.log('changes',changes)
  }
  
  ngOnInit() {
    this.getProductCategories();
  }

  public getProductCategories(){
    return this.productCategoryService
    .getProductCategories().subscribe( pC => {
      this.productCategories = pC;
      console.log(this.productCategories)
    });
  }
  // Methods
  public destroyProductCategory(id:number, imagePath:string){
    this.toDelete = confirm('** WARNING ** \n Are you sure you want to delete this Product Category?');
    if(this.toDelete){
      this.sharedService.emitChange('Product Category Deleted Successfully!');
      // Remove from UI
      this.productCategories = this.productCategories.filter(pC=>pC._id !== id);
      // Delete from db
      // if the image is the default image then dont delete the image
      if(imagePath === 'default.png'){
        this.productCategoryService.deleteProductCategory(id).subscribe();

      }else{
        this.productCategoryService.deleteProductCategory(id, '../src/assets/' + imagePath).subscribe();
      }
    }
  }



}
