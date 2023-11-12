import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './components/register/login/login.component';
import { SignUpComponent } from './components/register/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate : [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
