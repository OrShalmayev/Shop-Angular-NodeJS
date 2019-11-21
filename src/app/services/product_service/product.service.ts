import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model
import { Product } from '../../models/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /************** @Properties ***************/
  private getProductsUrl:string  = 'http://localhost:4201/api/products';
  private storeProductUrl:string = 'http://localhost:4201/api/products';

  constructor(
    private http:HttpClient
  ) { }

  /************** @Methods ***************/
  public storeProduct(product_category:string, body:Product):Observable<any> {
    return this.http.post<Product>(`${this.storeProductUrl}/${product_category}`, body)
  }


  public getProducts():Observable<any>{
    return this.http.get(this.getProductsUrl)
  }

}
