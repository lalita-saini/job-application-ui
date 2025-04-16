import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, type?: 'success' | 'error', title?: string }
  ) {}
}
