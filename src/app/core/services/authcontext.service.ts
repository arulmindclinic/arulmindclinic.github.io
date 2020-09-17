import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthcontextService {
  currentUser: firebase.User;
  constructor(private fireAuth: AngularFireAuth) {}

  authObserver(): Observable<firebase.User> {
    return this.fireAuth.authState.pipe(
      map(user => {
        this.currentUser = user;
        console.log('logged in user' + this.currentUser);
        return user;
      })
    );
  }

  signIn() {
    this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOut() {
    return this.fireAuth.signOut();
  }
}
