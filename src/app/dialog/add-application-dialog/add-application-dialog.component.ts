import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-application-dialog',
  templateUrl: './add-application-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule
  ],
})
export class AddApplicationDialogComponent {
  application = {
    companyName: '',
    position: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0]
  };

  constructor(
    public dialogRef: MatDialogRef<AddApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.application);
  }
}
