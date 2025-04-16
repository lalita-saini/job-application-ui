import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { RegisterDialogComponent } from '../../dialog/register-dialog/register-dialog.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty credentials', () => {
      expect(component.username).toBe('');
      expect(component.password).toBe('');
    });
  });

  describe('Form Interactions', () => {
    it('should update username on input', () => {
      const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
      const testValue = 'testuser';
      
      usernameInput.nativeElement.value = testValue;
      usernameInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.username).toBe(testValue);
    });

    it('should update password on input', () => {
      const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
      const testValue = 'testpass';
      
      passwordInput.nativeElement.value = testValue;
      passwordInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.password).toBe(testValue);
    });

    it('should have required form fields', () => {
      const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
      const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
      
      expect(usernameInput.nativeElement.required).toBeTruthy();
      expect(passwordInput.nativeElement.required).toBeTruthy();
    });
  });

  describe('Login Function', () => {
    it('should show dialog when username is empty', () => {
      component.password = 'password123';
      component.username = '';
      
      component.login();
      
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
        data: { message: 'Please enter both username and password.', type: 'error' }
      });
      expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should show dialog when password is empty', () => {
      component.username = 'username';
      component.password = '';
      
      component.login();
      
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
        data: { message: 'Please enter both username and password.', type: 'error' }
      });
      expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should call auth service and navigate on successful login', () => {
      const testCredentials = {
        username: 'testuser',
        password: 'Test@123'
      };
      
      component.username = testCredentials.username;
      component.password = testCredentials.password;
      authServiceSpy.login.and.returnValue(of({ token: 'fake-token', role: 'user' }));
      
      component.login();
      
      expect(authServiceSpy.login).toHaveBeenCalledWith(
        testCredentials.username,
        testCredentials.password
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/jobapplications']);
    });

    it('should show dialog on login error', () => {
      component.username = 'testuser';
      component.password = 'wrongpass';
      authServiceSpy.login.and.returnValue(throwError(() => new Error('Invalid credentials')));
      component.login();
      
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
        data: { message: 'Invalid credentials.', type: 'error' }
      });
    });
  });

  describe('Register Dialog', () => {
    it('should open register dialog with correct config', () => {
      component.goToRegister();
      
      expect(dialogSpy.open).toHaveBeenCalledWith(RegisterDialogComponent, {
        width: '400px'
      });
    });

    it('should update username when register dialog returns result', () => {
      const testUsername = 'newuser';
      dialogRefSpyObj.afterClosed.and.returnValue(of({ username: testUsername }));
      
      component.goToRegister();
      
      expect(component.username).toBe(testUsername);
    });

    it('should not update username when register dialog is cancelled', () => {
      const originalUsername = 'originaluser';
      component.username = originalUsername;
      dialogRefSpyObj.afterClosed.and.returnValue(of(null));
      
      component.goToRegister();
      
      expect(component.username).toBe(originalUsername);
    });
  });

  describe('Button Interactions', () => {
    it('should call login method when login button is clicked', () => {
      spyOn(component, 'login');
      const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      
      loginButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(component.login).toHaveBeenCalled();
    });

    it('should call goToRegister method when register button is clicked', () => {
      spyOn(component, 'goToRegister');
      const registerButton = fixture.debugElement.query(By.css('button[color="accent"]'));
      
      registerButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(component.goToRegister).toHaveBeenCalled();
    });
  });
});