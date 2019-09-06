import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ActivatedNavs {
  signIn: ActivatedNav;
  signUp: ActivatedNav;
  aboutUs: ActivatedNav;
}

interface ActivatedNav {
  path: string;
  activated: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  activatedNavs: ActivatedNavs = {
    signIn: {
      path: '/auth/sign-in',
      activated: false
    },
    signUp: {
      path: '/auth/sign-up',
      activated: false
    },
    aboutUs: {
      path: 'about-us',
      activated: false
    }
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.defineRouteUrl();
    this.setOnlineOrOfflienStatus();
  }

  setOnlineOrOfflienStatus() {
    if (navigator.onLine) {
      // this.auth.setStatusOnline().then();
    }
    window.addEventListener('online', () => {
      // this.auth.setStatusOnline().then();
    });
    window.addEventListener('offline', () => {
      this.auth.setStatusOffline().then();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  private defineRouteUrl() {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.setActivatedNav();
        }
      });
  }

  private setActivatedNav() {
    Object.keys(this.activatedNavs).forEach(key => {
      if (this.router.isActive(this.activatedNavs[key].path, false)) {
        this.activatedNavs[key].activated = true;
      } else {
        this.activatedNavs[key].activated = false;
      }
    });
  }
}
