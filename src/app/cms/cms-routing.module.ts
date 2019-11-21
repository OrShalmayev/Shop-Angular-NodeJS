import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CmsComponent } from './cms.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CreateProductCategoryComponent } from './components/product-categories/create_product_category/create.component';
import { EditProductCateogryComponent } from './components/product-categories/edit-product-cateogry/edit-product-cateogry.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';

const routes: Routes = [
  {path: '', component:CmsComponent, children:[
    {path: '', redirectTo: 'cms'},
    /*********** @ProductCategory ********/
    {path: 'product-categories', component:ProductCategoriesComponent},
    {path: 'product-categories/create', component: CreateProductCategoryComponent},
    {path: 'product-categories/edit/:id', component: EditProductCateogryComponent},
    
    /*********** @ProductCategory ********/
    {path: 'products', component: ProductsComponent},
    {path: 'products/create', component: CreateProductComponent},

    /*********** @Orders ********/
    {path: 'orders', component: OrdersComponent},
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule {}