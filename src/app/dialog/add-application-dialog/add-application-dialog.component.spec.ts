import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddApplicationDialogComponent } from './add-application-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

describe('AddApplicationDialogComponent', () => {
  let component: AddApplicationDialogComponent;
  let fixture: ComponentFixture<AddApplicationDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddApplicationDialogComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        BrowserAnimationsModule,
        AddApplicationDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.application.status).toBe('Applied');
    expect(component.application.companyName).toBe('');
    expect(component.application.position).toBe('');
    expect(component.application.dateApplied).toBeTruthy();
  });

  it('should close dialog with null when cancel is clicked', () => {
    component.onCancel();

    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog with application data when save is clicked', () => {
    const testData = {
      companyName: 'Test Company',
      position: 'Test Position',
      status: 'Interview',
      dateApplied: '2024-01-01'
    };
    component.application = testData;

    component.onSave();

    expect(dialogRef.close).toHaveBeenCalledWith(testData);
  });

  it('should update application properties when form inputs change', () => {
    const testCompany = 'New Company';
    const testPosition = 'New Position';
    
    component.application.companyName = testCompany;
    component.application.position = testPosition;
    fixture.detectChanges();

    expect(component.application.companyName).toBe(testCompany);
    expect(component.application.position).toBe(testPosition);
  });
});