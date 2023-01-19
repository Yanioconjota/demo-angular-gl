import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from "../services/auth.service";
import { from, of } from "rxjs";
import { UiMessagesService } from "src/app/shared/services/ui-messages.service";

@Injectable()

export class AuthEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private customMessage: UiMessagesService) {}


  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loadUser),
      //Since the effects takes an observable we use the from rxjs operator to transform firebase promise response into an observable
      mergeMap((action) => from(this.authService.login(action.email, action.password))
        .pipe(
          map(user => AuthActions.loadUserSucess({ user: user } as any)),
          catchError(err => {
            const { message } = err;
            //Custom modal options
            const modalOptions = {
              msg: message,
              title: 'Register Error!',
              icon: 'warning',
              showLoading: true,
              timer: 3500
            };

            this.customMessage.customModal(modalOptions);
            return of(AuthActions.loadUserError({ error: err }))
          })
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
          map(user => AuthActions.loadUserSucess({ user: user } as any)),
          catchError(err => of(AuthActions.loadUserError({ error: err })))
        )
      )
    )
  );
}
