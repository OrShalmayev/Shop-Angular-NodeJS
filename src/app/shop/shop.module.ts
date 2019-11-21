import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Components
import { CartComponent } from './cart/cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
    declarations: [CartComponent, ProductCategoryComponent],
    imports:[CommonModule, SharedModuleModule],
    exports:[CartComponent]
})

export class ShopModule{}