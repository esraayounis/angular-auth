import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 public users:any = [];
 public role!:string;
 public fullName : string = "";

  constructor(private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
    
    this.auth.getAllUsers().subscribe(res=>{
    this.users = res;
    console.log(this.users);
    });

    this.userStore.getFullNameFromStore().subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }

}
