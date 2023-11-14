import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateform';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, RouterLink]
})
export class LoginComponent {
  loginForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  submitted = false;

  constructor(private fb: FormBuilder, private authService :AuthService, private router:Router, 
    private toast: NgToastService,  private userStore: UserStoreService) { 
    }
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email:['', Validators.required],
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
     debugger
     if(this.loginForm.valid){
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.authService.storeToken(res.access_token);
          this.authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
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
