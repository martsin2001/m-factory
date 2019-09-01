import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken || 'auth';
    if (
      req.url.indexOf('/auth/signin') !== -1 &&
      req.url.indexOf('/auth/signup') !== -1
    ) {
      return next.handle(req);
    }
    return next
      .handle(
        req.clone({
          headers: req.headers.append('Authorization', token)
        })
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.authService.removeToken();
    }

    return throwError(err);
  }
}
