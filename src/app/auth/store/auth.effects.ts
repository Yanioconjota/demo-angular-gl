import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from "../services/auth.service";
import { from, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable()

export class AuthEffect {

  constructor(private actions$: Actions,
              private authService: AuthService) {}


  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) => from(this.authService.login(action.email, action.password))
        .pipe(
          tap( data => console.log('getUserById effect: ', data) ),
          map(user => AuthActions.loginSucess({ user: user } as any)),
          catchError(err => of(AuthActions.loginError({ error: err })))
        )
      )
    )
  );

  createUser$ =  createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.createUser),
      mergeMap((action) => from(this.authService.createUser(
        action.name, action.email, action.password))
        .pipe(
          tap( data => console.log('getUserById effect: ', data) ),
          map(user => AuthActions.createUserSucess({ user: user } as any)),
          catchError(err => of(AuthActions.createUserError({ error: err })))
        )
      )
    )
  );
}
