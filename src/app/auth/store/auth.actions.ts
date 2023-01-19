import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUser = createAction(
  '[USER] Load User',
  props<{ email: string, password: string }>()
);
export const loadUserSucess = createAction(
  '[USER] Load User Sucess',
  props<{ user: User }>()
);

export const loadUserError = createAction(
  '[USER] Load User Error',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[USER] Create User',
  props<{ name: string, email: string, password: string }>()
);
