import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product_service/product.service';
import { Product } from 'src/app/models/Product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  /**@Properties */
    //properties for page header
    public headerIconInput = 'stay_primary_portrait';
    public headerTitleInput = 'Products';
    public headerTextInput = 'Curabitur ullamcorper ultricies nisi. Cras sagittis. Fusce ac felis sit amet ligula pharetra condimentum.';
    public headerButtonDescription = 'Product';
    
  public products:Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    // Get all the products from db
    this.getProducts();
  }

  /**@Methods */

  public getProducts():void {
    this.productService.getProducts()
      .subscribe(p => {
        this.products = p;
        // Debug
        console.log(p);
      });
  }  


}
