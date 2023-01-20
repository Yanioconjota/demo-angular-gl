
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthState } from '../models/auth.model';

export const selectAuthState = (state: AppState) => state.auth;

export const selectError = createSelector(selectAuthState, (state: AuthState) => state.error);
export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);
export const selectIsPending = createSelector(selectAuthState, (state: AuthState) => state.isPending);
export const selectUid = createSelector(selectAuthState, (state: AuthState) => state.uid);
