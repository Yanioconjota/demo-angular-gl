import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import { from, of } from "rxjs";
import { UiMessagesService } from "src/app/shared/services/ui-messages.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { register, registerFailure, registerSuccess } from "./auth.actions";
import { AuthedUser, Authenticate } from "../models/auth.model";

@Injectable()

export class AuthEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private customMessage: UiMessagesService) {}


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      map(action => action.auth),
      switchMap((auth: Authenticate) =>
        from(this.authService.auth.createUserWithEmailAndPassword(auth.email, auth.password)).pipe(
          map(authedUser => {

            const user: AuthedUser = {
              displayName: authedUser?.user?.displayName ?? null,
              email: authedUser?.user?.email ?? null,
              emailVerified: authedUser?.user?.emailVerified ?? false,
              phoneNumber: authedUser?.user?.phoneNumber ?? null,
              photoUrl: authedUser?.user?.photoURL ?? null,
              refreshToken: authedUser?.user?.refreshToken ?? null,
              uid: authedUser?.user?.uid ?? null
            };
            this.customMessage.customModal(`${user.email} added successfully`, 'Success!', 'success');
            this.firestore.doc(`${user?.uid}/user`).set({...user})
            return registerSuccess({ authedUser: user });
          }),
          catchError(error => {
            console.log(error);
            this.customMessage.customModal(error.code, 'Register error!', 'warning');
            return of(registerFailure({ error }))
          })
        )
      )
    )
    );
}
