import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory.interface';
import { ProductCategoryService } from 'src/app/services/product_category_service/product-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Location } from '@angular/common';
import { SharedServiceService } from 'src/app/services/shared-service.service';
@Component({
  selector: 'app-edit-product-cateogry',
  templateUrl: './edit-product-cateogry.component.html',
  styleUrls: ['./edit-product-cateogry.component.scss']
})
export class EditProductCateogryComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  /********** @Properties **********/

  // Form Properties 
  public form: FormGroup;
  public nameError:string;
  public descriptionError:string;        
  public imageName = null;                   // getting the image name
  public disableSubmit:boolean = false;     // if the form is not valid disable the submit btn
  public changeImage:boolean = false;      // determines whether we want to change the current image or not.
  public deleteImage:boolean = false;     // determines if we want to delete the current image and return to the defaults
  @Output('message') public message: EventEmitter<string> = new EventEmitter(); // the message we want to send when we succeed editing.

  // Getting the value from the form inputs
  @ViewChild('nameEl', {static:true})         public name: ElementRef;
  @ViewChild('descriptionEl', {static:true})  public description: ElementRef;
  // Other Properties
  public productCategory; 
  public id:number = this.route.snapshot.params['id'];  // gettign the id from parameter named "id"
  public uploader:FileUploader = new FileUploader({url: this.productCategoryService.uploadImageUrl(), itemAlias: 'images'});
  /**
   * 
   * @param productCategoryService 
   * @param route 
   * @param router
   * @param location 
   */
  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService, 
    private route: ActivatedRoute, 
    private router: Router,
    private location:Location,
    private sharedService: SharedServiceService
    ) { }


  ngOnInit() {
    // console.log(this.changeImage);
    this.buildForm();

    this.getProductCategory();

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { 
      file.withCredentials = false; 
    }

      //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item.progress, status, JSON.parse(response).filename);
        this.imageName = JSON.parse(response).filename;
    };
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ngAfterViewChecked():void{
  }

  /********** @Methods **********/ 
  
  public processForm(){
    // console.log(this.form.value)
    let updateImage = false;
    if(this.changeImage || this.imageName){
      updateImage = true;
      this.form.value.images = this.imageName;
    }
    // console.log('changeImage=',this.changeImage)
    // console.log('imageName=',this.imageName)
    // console.log('updateImage=',updateImage)
    this.productCategoryService
      .updateProductCategory(this.id, this.form.value, updateImage, this.imageName)
        .subscribe(updatePc => {
          // console.log(updatePc);
          // flash a success message
          this.sharedService.emitChange(`${this.form.value.name} Updated Successfully!`)
          this.router.navigateByUrl('/cms/product-categories');
        })
  }



  public buildForm(): void{
    // Build out form
    this.form = this.fb.group({
      name: [, [Validators.minLength(3), Validators.required, Validators.maxLength(20)]],
      description: [, [Validators.minLength(10), Validators.required, Validators.maxLength(250)]],
      images: [, ]
    })

    // Watch for change and validate
    this.form.valueChanges.subscribe(data => this.validateForm(data))

    // console.log(this.form)
  }



  public validateForm(data): void {
    // console.log(data);

    this.nameError = '';
    this.descriptionError = '';


    // Validate each field
    let name = this.form.get('name');
    let description = this.form.get('description');
    // console.log(name)

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

  


  public getProductCategory(): void{
    this.productCategoryService.getProductCategory(this.id).subscribe(pC => {
      // console.log('edit',pC);
      this.productCategory = pC;
      // Setting the form value to the products that we got from the server.
      this.form.value.name = pC.name;
      this.form.value.description = pC.description;
      this.form.value.images = pC.images;
    });
  }


  public deleteImageFunc() {
    this.deleteImage = true;
    let updateImage = true;
    this.sharedService.emitChange(`${this.form.value.name.toUpperCase()} photo deleted sucessfully!`)
    return this.productCategoryService
    .updateProductCategory(this.id, this.form.value, updateImage, this.imageName, this.deleteImage)
      .subscribe(updatePc => {
        // Flash message
        // console.log(updatePc);
      })
  }

  public goBack(){
    this.location.back();
  }

}
