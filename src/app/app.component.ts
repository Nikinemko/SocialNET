import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'Social Network';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument!: UserDocument;
  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          // alert('Logged In');
        },
        whenSignedOut: (user) => {
          // alert('Logged Out');
        },
        whenSignedInAndEmailNotVerified: (user) => {
          this.router.navigate(['emailVerification']);
        },
        whenSignedInAndEmailVerified: (user) => {
          this.getUserProfile();
        },
        whenChanged: (user) => {},
      });
    });
  }

  getUserProfile() {
    this.firestore.listenToDocument({
      name: 'Getting Document',
      path: ['Users', this.auth?.getAuth()?.currentUser?.uid || '{}'],
      onUpdate: (result) => {
        this.userDocument = <UserDocument>result.data();
        this.userHasProfile = result.exists;
        if (this.userHasProfile) {
          this.router.navigate(['postFeed']);
        }
      },
    });
  }
  loggedIn() {
    return this.auth.isSignedIn();
  }
  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }
  onLogoutClick() {
    this.auth.signOut();
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
}
