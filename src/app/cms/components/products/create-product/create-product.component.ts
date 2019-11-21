import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/models/ProductCategory.interface';
import { ProductCategoryService } from 'src/app/services/product_category_service/product-category.service';
// Package for uploaing a file
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ProductService } from 'src/app/services/product_service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product.interface';
import { SharedServiceService } from 'src/app/services/shared-service.service';

const URL = 'http://localhost:4201/api/upload-file';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass']
})
export class CreateProductComponent implements OnInit {
  /**@Properties */
  //properties for page header
  public headerIconInput = 'stay_primary_portrait';
  public headerTitleInput = 'Products';
  public headerTextInput = 'Curabitur ullamcorper ultricies nisi. Cras sagittis. Fusce ac felis sit amet ligula pharetra condimentum.';
  public headerButtonDescription = 'Product';

  public form:FormGroup; 
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'products'});
  public productCategories:ProductCategory;
  // Upload image properties
  public imageName:string;
  public hideUploadBtn:boolean = true;
  // Error Variables
  public productCategoryErr:string;
  public nameErr:string;
  public descriptionErr:string;
  public priceErr:string;
  public discountErr:string;
  public inStockErr:string;
  // Product category properties
  public product_category_id:string; // we will get the id from the form
  // Output a message
  @Output('message') public message:EventEmitter<string> = new EventEmitter();

  constructor(
    private fb:FormBuilder,
    private productCategoryService:ProductCategoryService,
    private productService:ProductService,
    private router:Router,
    private sharedService: SharedServiceService
  ) { }

  ngOnInit() {
    this.buildForm();
    // Getting the product Categories
    this.getProductCategories();

    
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { 
      file.withCredentials = false; 
      this.hideUploadBtn = false;
    }

      //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item.progress, status, JSON.parse(response).filename);
        this.imageName = JSON.parse(response).filename;
    };
  }
  
  /**@Methods */
  
  public processForm(){
    this.productService.storeProduct(this.product_category_id, this.form.value).subscribe(p => {
      // Debug
      console.log(p);
    });
      // Flash a message that a product is created
      this.sharedService.emitChange(`Product Created Successfully!`);
      // redirect to the products table
      return this.router.navigateByUrl('/cms/products');
    // Debug
    console.log(this.form);  
  }


  public buildForm():void{
    this.form = this.fb.group({
      productCategory:  ['', Validators.required],
      name:             ['', Validators.required],
      description:      ['', Validators.required],
      price:            ['', Validators.required],
      discount:         ['', Validators.required],
      inStock:          ['', Validators.required],
    });

    
    // watch for changes and vlidate
    this.form.valueChanges.subscribe(data => {
      console.log(data);
      // Validate each field
      let productCategory = this.form.get('productCategory');
      let name =            this.form.get('name');
      let description =     this.form.get('description');
      let price =           this.form.get('price');
      let discount =        this.form.get('discount');
      let inStock =         this.form.get('inStock');
      
      this.productCategoryErr = '';
      this.nameErr = '';
      this.descriptionErr = '';
      this.priceErr = '';
      this.discountErr = '';
      this.inStockErr = '';

      // product category validation
      if(productCategory.invalid && productCategory.touched){
        this.productCategoryErr = 'Please Select Product Category.';
        console.log(this.productCategoryErr)
      }else{
        this.product_category_id = productCategory.value;
      }
      // name validation
      if(name.invalid && name.dirty){
        this.nameErr = 'Name is required';
      }
      // description validation
      if(description.invalid && description.dirty){
        this.descriptionErr = 'Description is required';
      }
      // price validation
      if(price.invalid && price.dirty){
        this.priceErr = 'Price is required';
      }
      // discount validation
      if(discount.invalid && discount.dirty){
        this.discountErr = 'Discount is required';
      }
      // inStock validation
      if(inStock.invalid && inStock.dirty){
        this.inStockErr = 'In Stock is required';
      }
    });



  }


  public getProductCategories():void {
    this.productCategoryService.getProductCategories()
      .subscribe(pC => {
        this.productCategories = pC;
        console.log(pC);
      });
  }

  public formInvalid():boolean{
    return this.form.invalid;
  }

  public logFormErrors(){
    console.log(this.form);
  }
}
