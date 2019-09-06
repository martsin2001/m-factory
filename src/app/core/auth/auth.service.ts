import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly SIGNIN_API = environment.appEndpoint + '/auth/signin';
  readonly SIGNUP_API = environment.appEndpoint + '/auth/signup';
  readonly SET_USER_KEY = environment.appEndpoint + '/auth/set-user-key';

  constructor(private http: HttpClient, private fireDB: AngularFireDatabase) {}

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
    return this.http
      .post(this.SIGNUP_API, user, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          const body = JSON.parse(res.body);
          const token = body.token;
          this.setToken = token;
        })
      )
      .pipe(take(1));
  }

  checkCollocutorStatus() {
    this.fireDB.database
      .ref()
      .child('users/-LnvD5klo921sOvJYg0x')
      .onDisconnect()
      .update({ status: false })
      .then();
  }

  createFireNewUser(user: User) {
    return this.fireDB.list('users').push(user);
  }

  setUserKey(key: string) {
    return this.http
      .post(
        this.SET_USER_KEY,
        { key },
        {
          observe: 'response',
          responseType: 'text'
        }
      )
      .pipe(take(1));
  }

  getUserByKey(key: string) {
    return this.fireDB
      .object('users/' + key)
      .snapshotChanges()
      .pipe(
        map(fireRes => {
          return fireRes.payload.val() as User;
        })
      );
  }

  setStatusOnline() {
    return this.fireDB
      .object('users/' + localStorage.getItem('key'))
      .update({ status: true });
  }

  setStatusOffline() {
    return this.fireDB
      .object('users/' + localStorage.getItem('key'))
      .update({ status: false });
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
