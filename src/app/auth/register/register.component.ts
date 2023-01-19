import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../store/auth.actions'
import { getFetchUserStatus } from '../store/auth.selectors';
import { FetchStatus } from '../../shared/enums/status.enum';
import { UiMessagesService } from 'src/app/shared/services/ui-messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {

  registerForm!: FormGroup;
  subscriber!: Subscription;
  //status$: Observable<any> = this.store.select(getFetchUserStatus);
  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private router: Router,
              private customMessage: UiMessagesService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '',  [Validators.required, Validators.pattern(this.emailPattern)] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  showError(field: string) {
    return this.customMessage.touchedField(this.registerForm, field)
  }

  iconError(fieldName: string) {
    return this.customMessage.inputValidationStyle(this.registerForm, fieldName);
  }

  createUser(): void {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    this.store.dispatch(AuthActions.createUser({name, email, password}))
  }

}
