import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
}


import { ProductCategory } from '../../models/ProductCategory.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private productCategoriesUrl:string = 'http://localhost:4201/api/product-categories';
  public postProductCategoriesUrl:string = 'http://localhost:4201/api/product-categories';
  private deleteProductCategoriesUrl:string = 'http://localhost:4201/api/product-categories';
  private ProductCategoryUrl:string = 'http://localhost:4201/api/product-categories';
  private ProductCategoryUploadImageUrl:string = 'http://localhost:4201/api/upload-file';
  
  constructor(
    private http: HttpClient
  ) { }
  /** END CONSTRUCTOR */




  public getProductCategories():Observable<any>{
    return this.http.get(this.productCategoriesUrl);
  }




  public storeProductCategory(value:ProductCategory): Observable<any>{
    return this.http.post<ProductCategory>(this.postProductCategoriesUrl, value, httpOptions);
  }




  public deleteProductCategory(id:number, imagePath:string = ''):Observable<any> {
    if(imagePath){
      return this.http.delete(`${this.deleteProductCategoriesUrl}/${id}?imagePath=${imagePath}`, httpOptions);
    }else{
      return this.http.delete(`${this.deleteProductCategoriesUrl}/${id}`, httpOptions);
    }
  }




  public getProductCategory(id:number):Observable<any>{
    return this.http.get(`${this.ProductCategoryUrl}/${id}`);
  }




  public updateProductCategory(id:number, body:ProductCategory, updateImage:boolean = false, updatedImageName = null, deleteImage:boolean = false):Observable<any>{
    console.log('body:', body);
    // if the admin wants to delete the image..
    if(deleteImage){
      return this.http.put(`${this.ProductCategoryUrl}/${id}?deleteImage=${deleteImage}`, body);
    }

    if(!updateImage){
      return this.http.put(`${this.ProductCategoryUrl}/${id}?updateImage=${updateImage}`, body);
    }else{
      return this.http.put(`${this.ProductCategoryUrl}/${id}?updateImage=${updateImage}&updatedImageName=${updatedImageName}`, body);
    }

  }




  public uploadImageUrl():string {
    return this.ProductCategoryUploadImageUrl;
  }



}
