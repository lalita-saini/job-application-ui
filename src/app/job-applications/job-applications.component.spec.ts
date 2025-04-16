import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobApplicationsComponent } from './job-applications.component';
import { JobApplicationService } from '../services/job-application.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { AddApplicationDialogComponent } from '../dialog/add-application-dialog/add-application-dialog.component';

describe('JobApplicationsComponent', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;
  let applicationServiceSpy: jasmine.SpyObj<JobApplicationService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let mockDialogRef: any;

  const mockApplications = [
    { id: 1, companyName: 'Company 1', position: 'Position 1', status: 'Applied', dateApplied: '2024-01-01' },
    { id: 2, companyName: 'Company 2', position: 'Position 2', status: 'Interview', dateApplied: '2024-01-02' },
    { id: 3, companyName: 'Company 3', position: 'Position 3', status: 'Offer', dateApplied: '2024-01-03' },
    { id: 4, companyName: 'Company 4', position: 'Position 4', status: 'Applied', dateApplied: '2024-01-04' },
    { id: 5, companyName: 'Company 5', position: 'Position 5', status: 'Rejected', dateApplied: '2024-01-05' },
    { id: 6, companyName: 'Company 6', position: 'Position 6', status: 'Applied', dateApplied: '2024-01-06' }
  ];

  beforeEach(async () => {
    applicationServiceSpy = jasmine.createSpyObj('JobApplicationService', ['getJobApplications', 'getJobApplication', 'updateJobApplication', 'createJobApplication']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    mockDialogRef = {
      afterClosed: () => of(null)
    };

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        JobApplicationsComponent
      ],
      providers: [
        { provide: JobApplicationService, useValue: applicationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pagination', () => {
    beforeEach(() => {
      component.applications = mockApplications;
      component.totalPages = Math.ceil(mockApplications.length / component.pageSize);
    });

    it('should correctly set paged applications', () => {
      component.setPagedApplications();
      
      expect(component.pagedApplications.length).toBe(5);
      expect(component.pagedApplications[0]).toEqual(mockApplications[0]);
    });

    it('should go to next page', () => {
      component.currentPage = 1;
      component.nextPage();
      
      expect(component.currentPage).toBe(2);
      expect(component.pagedApplications).toEqual([mockApplications[5]]);
    });

    it('should go to previous page', () => {
      component.currentPage = 2;
      component.prevPage();
      
      expect(component.currentPage).toBe(1);
      expect(component.pagedApplications.length).toBe(5);
    });

    it('should not go beyond total pages', () => {
      component.currentPage = 2;
      component.nextPage();
      
      expect(component.currentPage).toBe(2);
    });

    it('should not go below page 1', () => {
      component.currentPage = 1;
      component.prevPage();
      
      expect(component.currentPage).toBe(1);
    });
  });

  describe('Dialog Operations', () => {
    it('should open add dialog', () => {
      const dialogConfig = { width: '400px', data: {} };
      dialogSpy.open.and.returnValue({ ...mockDialogRef });
      
      component.openAddDialog();
      
      expect(dialogSpy.open).toHaveBeenCalledWith(AddApplicationDialogComponent, dialogConfig);
    });

  });

  describe('Status Updates', () => {
    const mockApplication = mockApplications[0];

    it('should handle update error', () => {
      const newStatus = 'Interview';
      applicationServiceSpy.getJobApplication.and.returnValue(of(mockApplication));
      applicationServiceSpy.updateJobApplication.and.returnValue(throwError(() => new Error('Update failed')));
      
      component.updateStatus(mockApplication.id, newStatus);
      
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
        data: { message: 'Failed to update status. Please try again.', type: 'error' }
      });
    });
  });

  describe('Authentication', () => {
    it('should logout and navigate to login', () => {
      component.logout();
      
      expect(authServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('Editing Mode', () => {
    it('should set editing id', () => {
      const id = 1;
      component.setEditing(id);
      
      expect(component.editingId).toBe(id);
    });
  });
});