import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { User } from '../auth/auth.interfaces';
import { Observable } from 'rxjs';
import { Chat } from './chat.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private fireDB: AngularFireDatabase) {}

  createNewChat(chatData: Chat, done) {
    const chatKey = this.fireDB.createPushId().toString();
    this.fireDB
      .object(chatKey)
      .set(chatData)
      .then(() => {
        done(chatKey);
      });
  }

  getChatByKey(key: string) {
    return this.fireDB.object(key).snapshotChanges();
  }

  addNewChat(updatedKeys: string[]) {
    return this.fireDB
      .object('users/' + localStorage.getItem('key'))
      .update({ chatIds: updatedKeys });
  }

  findCollocutor(value: string): Observable<User[]> {
    return this.fireDB
      .list('users')
      .snapshotChanges()
      .pipe(
        map(users => {
          return users
            .map(user => user.payload.val())
            .filter((user: User) => {
              if (user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                return user;
              }
            }) as User[];
        })
      );
  }
}
