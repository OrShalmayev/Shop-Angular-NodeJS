import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory.interface';
import { ProductCategoryService } from 'src/app/services/product_category_service/product-category.service';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SharedServiceService } from 'src/app/services/shared-service.service';
//define the constant url we would be uploading to.
const URL = 'http://localhost:4201/api/upload-file';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateProductCategoryComponent implements OnInit {
  // Properties
  public form:FormGroup;
  public productCategory; 
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'images'});
  public nameError:string;
  public descriptionError:string;
  public imageName:string;
  public disableSubmit:boolean = true;
  public hideUploadBtn:boolean = true;

  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService, 
    private router: Router,
    private location: Location,
    private sharedService:SharedServiceService
    ) { }

  ngOnInit() {
    // Validation for the form
    this.buildForm()

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



  /** @Methods **/ 
  
  processForm(){
    if(this.imageName){
      this.form.value.images = this.imageName;
      this.productCategory = this.form.value;
    }else{
      this.productCategory = this.form.value;
      this.productCategory.images = '';
    }

        return this.productCategoryService.storeProductCategory(this.productCategory)
          .subscribe(pC=> {
            console.log(pC);
            this.sharedService.emitChange(`${pC.name} Created Successfully!`);
            return this.router.navigateByUrl('/cms/product-categories')
          });
  }

  
  public buildForm(): void{
    // Build out form
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.minLength(10), Validators.required, Validators.maxLength(250)]],
    })
    // Watch for change and validate
    this.form.valueChanges.subscribe(data => this.validateForm(data))
  }


  public validateForm(data): void {
    this.nameError = '';
    this.descriptionError = '';

    // Validate each field
    let name = this.form.get('name');
    let description = this.form.get('description');

    // if name is invalid.
    if(name.invalid && name.dirty) {
      if(name.errors['required'])
        this.nameError = "Name is required.";
      if(name.errors['minlength'])
        this.nameError = "Name must be at least 3 characters.";
      if(name.errors['maxlength'])
        this.nameError = "Name must be between 3 to 20 characters.";
    }
    // if description is invalid
    if(description.invalid && description.dirty){

      if(description.errors['required'])
        this.descriptionError = "Description is required.";
      if(description.errors['minlength'])
        this.descriptionError = "Description must be at least 10 characters.";
      if(description.errors['maxlength'])
        this.descriptionError = "Description must be between 10 to 250 characters.";
    }
    // if the form is valid then allow to submit the form
    if(name.valid && name.dirty && description.valid && description.dirty){
      this.disableSubmit = false;
    }else{
      this.disableSubmit = true;
    }
  }


  public goBack(){
    this.location.back();
  }



}
