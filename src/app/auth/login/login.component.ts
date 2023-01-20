import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { UiMessagesService } from 'src/app/shared/services/ui-messages.service';
import { login } from '../store/auth.actions';
import { selectIsAuthenticated } from '../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  subscriber!: Subscription;
  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);


  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private router: Router,
              private customMessage: UiMessagesService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '',  [Validators.required, Validators.pattern(this.emailPattern)] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  showError(field: string) {
    return this.customMessage.touchedField(this.loginForm, field)
  }

  iconError(fieldName: string) {
    return this.customMessage.inputValidationStyle(this.loginForm, fieldName);
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const auth = this.loginForm.value;
    this.store.dispatch(login({ auth }));
    this.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) { this.router.navigate(['/']) }
    })
  }

}
