import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, RouterLink]
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  submitted = false;

  constructor(private fb:FormBuilder, private authServic :AuthService, private router:Router, private toast: NgToastService) { 
    }

    ngOnInit(): void {
      this.signUpForm = this.fb.group({
        email:['', Validators.required],
        username:['', Validators.required],
        password: ['', Validators.required]
       });
    }

    hideShowPass(){
      this.isText = !this.isText ;
      this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type  = "text" : this.type ="password"
    }

    onSubmit(){
      this.submitted = true;
      
      if(this.signUpForm.valid){
        console.log(this.signUpForm.value);
        let signUpObj ={
          "email": this.signUpForm.controls["email"].value,
          "name":this.signUpForm.controls["username"].value,
          "password": this.signUpForm.controls["password"].value,
          "role": "customer",
          "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522user%2Bicon%2522&psig=AOvVaw38VcZVz7OUOepElo-wDLXx&ust=1699325350689000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDdgbKuroIDFQAAAAAdAAAAABAE"
        }

        this.authServic.signUp(signUpObj).subscribe({
          next:(res)=>{
            console.log(res.message);
            this.signUpForm.reset();
            this.toast.success({detail:"SUCCESS" ,  summary: res.message , duration: 5000});
            this.router.navigate(["login"]);
          },
          error:(err)=>{
            this.toast.error({detail:"ERROR" ,  summary: "something when wrong" , duration: 5000});
            console.log(err);
          }
          
        })
       }
 
      else{
        validateForm.validateAllFormFields(this.signUpForm);
       alert("your form is invalid")
      }
     
     }

}
