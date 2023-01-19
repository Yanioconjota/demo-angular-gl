import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
  '[USER] Login',
  props<{ email: string, password: string }>()
);
export const loginSucess = createAction(
  '[USER] Login Sucess',
  props<{ user: User }>()
);

export const loginError = createAction(
  '[USER] Login Error',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[USER] Create User',
  props<{ name: string, email: string, password: string }>()
);
export const createUserSucess = createAction(
  '[USER] Create User Sucess',
  props<{ user: User }>()
);

export const createUserError = createAction(
  '[USER] Create User Error',
  props<{ error: any }>()
);
