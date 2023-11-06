import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  submitted = false;

  constructor(private fb: FormBuilder, private authService :AuthService, private router:Router, private toast: NgToastService) { 
    }
    ngOnInit(): void {
      this.loginForm = this.fb.group({
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
      debugger
     this.submitted = true;
     if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.signUp(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.authService.storeToken(res.token);
          this.toast.success({detail:"SUCCESS" ,  summary: res.message , duration: 5000});
          this.router.navigate(["home"]);
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR" ,  summary: "something when wrong" , duration: 5000});
          console.log(err);
        }
      })
     }

     else{
      validateForm.validateAllFormFields(this.loginForm);
      console.log("form invalid");
      
     }
    }

}
