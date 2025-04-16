import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobApplicationService } from '../services/job-application.service';
import { JobApplication } from '../models/job-application.model';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddApplicationDialogComponent } from '../dialog/add-application-dialog/add-application-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-applications',
  imports: [CommonModule, FormsModule, MatFormFieldModule ],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];
  pagedApplications: JobApplication[] = [];
  statuses: string[] = ['Applied', 'Interview', 'Offer', 'Rejected'];
  editingId: number | null = null;
  application?: JobApplication

  pageSize = 5; 
  currentPage = 1;
  totalPages = 1;

  constructor(private dialog: MatDialog, private applicationService: JobApplicationService, private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications(): void {
    this.applicationService.getJobApplications().subscribe(data => {
      this.applications = data;
      this.totalPages = Math.ceil(this.applications.length / this.pageSize);
      this.setPagedApplications();
    });
  }

  setPagedApplications(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedApplications = this.applications.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPagedApplications();
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.createJobApplication(result).subscribe(() => {
          this.currentPage = 1;
          this.getApplications(); 
        });
      }
    });
  }

  logout() : void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  updateStatus(id: number, newStatus: string): void {
    this.applicationService.getJobApplication(id).subscribe({
      next: (data) => {
        this.application = data;
        if (this.application) {
          this.application.status = newStatus;
          this.applicationService.updateJobApplication(this.application.id, this.application).subscribe({
            next: () => {
              this.editingId = null;
              this.dialog.open(DialogComponent, {
                data: { message: `Status updated to "${newStatus}" successfully.` , type: 'success'}
              });
            },
            error: (err) => {
              console.error('Failed to update status', err);
              this.dialog.open(DialogComponent, {
                data: { message: 'Failed to update status. Please try again.' , type: 'error'}
              });
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to fetch application', err);
        this.dialog.open(DialogComponent, {
          data: { message: 'Failed to fetch application. Please try again.' , type: 'error'}
        });
      }
    });
  }
  
  setEditing(id: number) {
    this.editingId = id;
  }
}
