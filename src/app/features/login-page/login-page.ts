import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../componentes/form-utils/Formutils';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  formUtils = FormUtils;

  // Credenciales "quemadas" (no real auth)
  private USER = {
    email: 'usuario@ups.edu.ec',
    password: '123456'
  };

  errorMessage: string | null = null;

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage = null;
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    if (email === this.USER.email && password === this.USER.password) {
      // Simula autenticación correcta
      this.router.navigate(['/home']);
    } else {
      // Credenciales incorrectas
      this.errorMessage = 'Credenciales incorrectas. Verifique email y password.';
      // limpiar únicamente el campo password por seguridad
      this.myForm.get('password')?.reset();
    }
  }
}
