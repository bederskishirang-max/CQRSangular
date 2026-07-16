import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';
import { Register } from '../../models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerRequest: Register = {
    username: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}


// register() {
  
//   // 1. Create a payload mapping to match your C# DTO capital property names
//   const payload = {
//     Username: this.registerRequest.username,  // 👈 Capital U
//     Password: this.registerRequest.password   // 👈 Capital P
//   };

//   console.log("Sending payload to API:", payload);

//   // 2. Call your service using the corrected payload
//   this.auth.register(payload as any).subscribe({
//     next: () => {
//       alert('Registration successful.');
//       this.router.navigate(['/login']);
//     },
//     error: (err) => {
//       console.error("API Error Object Details:", err);
//       alert('Registration failed.');
//     }
//   });
// }



  register() {

    this.auth.register(this.registerRequest).subscribe({

      next: () => {

        alert('Registration successful.');

        this.router.navigate(['/login']);

      },

      error: () => {

        alert('Registration failed.');

      }

    });

  }

  //  register() {
  //   // 1. Map lowercase fields to the capital keys your database requires
  //   const payload = {
  //     Username: this.registerRequest.username,
  //     Password: this.registerRequest.password
  //   };

  //   // 2. Pass the capitalized payload through your auth service using 'as any'
  //   this.auth.register(payload as any).subscribe({
  //     next: () => {
  //       alert('Registration successful.');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => {
  //       console.error("API Error details:", err);
  //       alert('Registration failed.');
  //     }
  //   });
  // }

}