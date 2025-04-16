import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [ AuthService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-application-ui';
}
