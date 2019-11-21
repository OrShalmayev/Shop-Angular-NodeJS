import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user_service/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form:FormGroup;
  public emailErr:string;
  public passwordErr:string;
  public errors:string;
  public isFormValid:boolean = false;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private _flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });

    this.form.valueChanges.subscribe(data=>{
      let email = this.form.get('email');
      let password = this.form.get('password');
      this.emailErr = '';
      this.passwordErr = '';

      /**@Validations */

        // name validation
        if(password.dirty && password.errors){
          if(password.errors.required){
            this.passwordErr = "password is required.";
          }
          if(password.errors.minlength){
            this.passwordErr = `password must contain at least ${password.errors.minlength.requiredLength}, current length: ${password.errors.minlength.actualLength}`;
          }
        }
        
        // email validation
        if(email.dirty && email.errors){
          if(email.errors.required){
            this.emailErr = "Email is required.";
          }
          if(email.errors.email){
            this.emailErr = 'Email is not valid.';
          }
        }else if(email.valid){
          this.userService.isEmailExists(this.form.value.email).subscribe(e => {
            if(e.valid === false){
              this.emailErr = e.message;
            }
          });
        }

        // check if form is valid
        if(this.emailErr.length > 0 || this.passwordErr.length > 0){
          this.isFormValid = false;
        }else if(this.emailErr.length === 0 || this.passwordErr.length === 0){
          this.isFormValid = true;
        }
    });
  }

  public processForm(){
    this.userService.storeUser(this.form.value).subscribe(user=>{
      /* Check for errors */
      if(user.errors){
        for(let m in user.errors){
          this.errors += user.errors[m].password;
        }
      }else if(user.code && user.code === 11000){
        this.errors = 'Email is already taken.';
      }else{
        this._flashMessagesService.show('Registered Successfully!', { cssClass: 'alert-success', timeout: 5000 });
        return this.router.navigateByUrl('/login');
      }

    });
    /* Check for errors */

  }
}
