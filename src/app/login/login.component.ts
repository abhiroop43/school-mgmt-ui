import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  hasUnitNumber = false;
  matcher = new LoginFormErrorStateMatcher();
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
    }
  }
}
