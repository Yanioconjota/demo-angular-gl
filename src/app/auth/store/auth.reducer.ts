import { FetchStatus } from 'src/app/shared/enums/status.enum';
import { User } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface UserState {
    id: string | null,
    user: User | null,
    status: FetchStatus.Pending | FetchStatus.InProgress | FetchStatus.Completed,
    error: any
}

export const userInitialState: UserState = {
  id: null,
  user: null,
  status: FetchStatus.Pending,
  error: null
}

export const authReducer = createReducer(
  userInitialState,

  on(AuthActions.login, (state, { email, password }) => ({
    ...state,
    status: FetchStatus.InProgress,
    email,
    password
  })),

  on(AuthActions.loginSucess, (state, { user }) => ({
    ...state,
    status: FetchStatus.Completed,
    user: {...user}
  })),

  on(AuthActions.loginError, (state, { error }) => ({
      ...state,
      status: FetchStatus.Completed,
      error: {
        url: error.url,
        name: error.name,
        message: error.message
      }
    })),
)
