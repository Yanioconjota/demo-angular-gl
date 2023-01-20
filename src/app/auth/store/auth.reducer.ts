import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from '../models/auth.model';

export const initialState: AuthState = {
    error: null,
    isAuthenticated: false,
    isPending: false,
    displayName: null,
    email: null,
    emailVerified: false,
    phoneNumber: null,
    photoUrl: null,
    refreshToken: null,
    uid: null,
};

export const authReducer = createReducer(
    initialState,
    // Login & Register
    on(authActions.login, authActions.register, state => ({
        ...state,
        isPending: true
    })),
    on(authActions.loginFailure, authActions.registerFailure, (state, { error }) => ({
        ...state,
        error,
        isPending: false
    })),
    on(authActions.loginSuccess, authActions.registerSuccess, (state, { authedUser }) => ({
        ...state,
        ...authedUser,
        isAuthenticated: true,
        isPending: false,
    })),
    // Logout
    on(authActions.logout, () => ({
        ...initialState
    })),
);
