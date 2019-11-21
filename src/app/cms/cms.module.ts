import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FileSelectDirective } from 'ng2-file-upload';


// Components
import { CmsComponent } from './cms.component';
import { CmsRoutingModule } from './cms-routing.module';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

// Services
import { HttpClientModule } from '@angular/common/http';

// Custom Services
import { ProductCategoryService } from '../services/product_category_service/product-category.service';
import { CreateProductCategoryComponent } from './components/product-categories/create_product_category/create.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ProductCategoriesTableComponent } from './components/product-categories/product-categories-table/product-categories-table.component';
import { EditProductCateogryComponent } from './components/product-categories/edit-product-cateogry/edit-product-cateogry.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ShopModule } from '../shop/shop.module';


@NgModule({
  declarations: [
    CmsComponent,
    ProductCategoriesComponent, 
    ProductsComponent, 
    OrdersComponent, 
    CreateProductCategoryComponent, 
    CreateProductComponent, 
    ProductCategoriesTableComponent, 
    EditProductCateogryComponent,
    FileSelectDirective,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    CmsRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModuleModule,
    ShopModule
  ],
  exports: [],
  providers: [ProductCategoryService]
})
export class CmsModule { }
