import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RegisterDialogComponent } from '../../dialog/register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule], 
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  login() {
    if (!this.username || !this.password) {
      this.dialog.open(DialogComponent, {
        data: { message: 'Please enter both username and password.', type: 'error' }
      });
      return;
    }
    
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/jobapplications']);
      },
      error => {
        this.dialog.open(DialogComponent, {
                    data: { message: 'Invalid credentials.', type: 'error' }
                  });
      }
    );
  }

  goToRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.username = result.username;
      }
    });
  }
}
