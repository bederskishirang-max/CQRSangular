import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import { Login } from '../../models/login';

import { RouterModule } from '@angular/router';

@Component({

selector:'app-login',
standalone:true,
imports:[FormsModule,RouterModule],
templateUrl:'./login.html'

})

export class LoginComponent{

loginRequest:Login={

username:'',

password:''

};

constructor(

private auth:AuthService,

private router:Router

){}

login(){

this.auth.login(this.loginRequest)

.subscribe({

next:(res:any)=>{

this.auth.saveToken(res.token);

this.router.navigate(['/employees']);

},

error:(err)=>{

alert("Invalid username or password");

}

});

}

}