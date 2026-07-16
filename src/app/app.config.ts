// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes),
//     provideHttpClient()
//   ]
// };



import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {

provideHttpClient,

withInterceptors

} from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {

providers:[

provideRouter(routes),

provideHttpClient(

withInterceptors([authInterceptor])

)

]

};