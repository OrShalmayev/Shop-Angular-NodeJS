import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { Product } from '../../models/Product.interface';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.sass']
})
export class ProductCategoryComponent implements OnInit {
  public title:string; 
  public productsAPI:Product[] = [
    {_id:1, name: 'laptop1', description:'lorem ipsum1', price:2321, inStock:1, image: 'img1.png', slug:'laptop1', category_slug:'laptops'},
    {_id:2, name: 'laptop2', description:'lorem ipsum1', price:2321, inStock:1, image: 'img1.png', slug:'laptop2', category_slug:'laptops'},
    {_id:3, name: 'laptop2', description:'lorem ipsum1', price:2321, inStock:1, image: 'img1.png', slug:'laptop2', category_slug:'laptops'},
    {_id:4, name: 'laptop3', description:'lorem ipsum1', price:2321, inStock:1, image: 'img1.png', slug:'laptop3', category_slug:'laptops'},
    {_id:5, name: 'drone1', description:'lorem ipsum1', price:1321, inStock:1, image: 'img1.png', slug:'drone1', category_slug:'drones'},
    {_id:6, name: 'drone2', description:'lorem ipsum1', price:1321, inStock:1, image: 'img1.png', slug:'drone2', category_slug:'drones'},
    {_id:7, name: 'drone3', description:'lorem ipsum1', price:1321, inStock:1, image: 'img1.png', slug:'drone3', category_slug:'drones'},
  ];

  public products:Product[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // grab the current product category
    this.title = this.route.snapshot.params['product_category'];
    this.products = this.productsAPI.filter( p => p.category_slug === this.title);
  }

}
