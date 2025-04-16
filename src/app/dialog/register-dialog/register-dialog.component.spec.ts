import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterDialogComponent } from './register-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { DialogComponent } from '../dialog.component';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RegisterDialogComponent>>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    mockDialogRef.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        RegisterDialogComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty registration form', () => {
    expect(component.registerUser).toEqual({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    });
  });

  it('should close dialog on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});