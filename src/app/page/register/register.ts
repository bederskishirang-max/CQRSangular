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

}