import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { JobApplicationsComponent } from './app/job-applications/job-applications.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'jobapplications', component: JobApplicationsComponent }
    ]), provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideHttpClient()
  ],
}).catch(err => console.error(err));
