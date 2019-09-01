import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly SIGNIN_API = environment.appEndpoint + '/auth/signin';
  readonly SIGNUP_API = environment.appEndpoint + '/auth/signup';

  constructor(private http: HttpClient) {}

  signin(user: { email: string; password: string }) {
    return this.http
      .post(this.SIGNIN_API, user, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          const token = JSON.parse(res.body).token;
          this.setToken = token;
        })
      );
  }

  signup(user: { name: string; email: string; password: string }) {
    return this.http.post(this.SIGNUP_API, user, {
      observe: 'response',
      responseType: 'text'
    });
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  get getToken() {
    return localStorage.getItem('token') || null;
  }

  private set setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
