// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth';

// export const authGuard: CanActivateFn = () => {

// const auth=inject(AuthService);

// const router=inject(Router);

// if(auth.isLoggedIn()){

// return true;

// }

// router.navigate(['/login']);

// return false;

// };

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
