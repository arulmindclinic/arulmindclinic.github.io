import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthcontextService {
  currentUser: firebase.User;
  constructor(private fireAuth: AngularFireAuth) {}

  authObserver(): Observable<firebase.User> {
    return this.fireAuth.authState.pipe(
      map((user) => {
        this.currentUser = user;
        console.log('logged in user' + this.currentUser);
        return user;
      })
    );
  }

  signIn() {
    this.fireAuth.signInWithEmailAndPassword(
      'arulmindclinic@gmail.com',
      'test@123'
    );
  }

  signOut() {
    return this.fireAuth.signOut();
  }
}
