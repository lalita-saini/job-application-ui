import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'jobapplications', component: JobApplicationsComponent }
];
