import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, ɵɵinject } from '@angular/core';

export const authGuard: CanActivateFn = ( route, state) => {
  
 // Use dependency injection to get an instance of the AuthService
 const authService =  ɵɵinject(AuthService);

 if (authService.isLoggedIn()) {
  return true;
} else {
  return inject(Router).createUrlTree(['login']);
}
};
