import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setStatus();
  }

  setStatus() {
    if (navigator.onLine) {
      this.authService.setStatusOnline().then();
    } else {
      this.authService.setStatusOffline().then();
    }
  }
}
