import { Routes } from '@angular/router';

import { LoginComponent } from './page/login/login';

import { RegisterComponent } from './page/register/register';

import { EmployeeListComponent } from './page/employee-list/employee-list';

import { AddEmployeeComponent } from './page/add-employee/add-employee';

import { EditEmployeeComponent } from './page/edit-employee/edit-employee';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

{

path:'',

redirectTo:'login',

pathMatch:'full'

},

{

path:'login',

component:LoginComponent

},

{

path:'register',

component:RegisterComponent

},

 {

 path:'employees',

 component:EmployeeListComponent,

 canActivate:[authGuard]

 },

{

path:'addEmployee',

component:AddEmployeeComponent,

canActivate:[authGuard]

},

{

path:'editEmployee/:id',

component:EditEmployeeComponent,

canActivate:[authGuard]

},

{

path:'**',

redirectTo:'login'

}

];