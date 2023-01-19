import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state'
import { UserState } from './auth.reducer';

export const selectUser = (state: AppState) => state.user;

export const getFetchUserStatus = createSelector(
  selectUser,
  (state: UserState) => state.status
);

export const getFetchUser = createSelector(
  selectUser,
  (state: UserState) => state.user
);

export const getFetchUserError = createSelector(
  selectUser,
  (state: UserState) => state.error
);
