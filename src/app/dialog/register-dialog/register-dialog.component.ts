import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ],
})
export class RegisterDialogComponent {
  registerUser = {
    email : '',
    firstName : '',
    lastName : '',
    password : '',
    confirmPassword : '',
  }
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, 
    private authService: AuthService,
     private router: Router,
     private dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: any) {}

  register() {
    if (!this.emailRegex.test(this.registerUser.email)) {
      this.dialog.open(DialogComponent, {
        data: { message: 'Please enter a valid email address.', type: 'error' }
      });
      return;
    }

    if (!this.passwordRegex.test(this.registerUser.password)) {
      this.dialog.open(DialogComponent, {
                      data: { message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.', type: 'error' }
                    });
      return;
    }
    if (this.registerUser.password === this.registerUser.confirmPassword) {
      this.authService.register(this.registerUser).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          this.dialog.open(DialogComponent, {
            data: { message: 'Failed to register user.', type: 'error' }
          });
        }
      );
      this.dialogRef.close();
    } else {
      this.dialog.open(DialogComponent, {
        data: { message: 'Passwords do not match.', type: 'error' }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
