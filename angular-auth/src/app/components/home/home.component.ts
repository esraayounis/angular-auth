import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 public users:any = [];
 constructor(private authService:AuthService){}

 ngOnInit() {
  this.authService.getAllUsers().subscribe(res=>{
    this.users = res;
  })
 }
}
