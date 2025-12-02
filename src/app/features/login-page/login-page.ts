import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../componentes/form-utils/Formutils';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  isLoading = signal(false);


  formUtils = FormUtils;

  private USER = {
    email: 'usuario@ups.edu.ec',
    password: '123456'
  };

  showPassword = false; 

  errorMessage: string | null = null;

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required, 
      Validators.minLength(6) ,
      
    ]],
  });

  onSubmit() {
  this.errorMessage = null;

  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);

  const { email, password } = this.myForm.value;

  setTimeout(() => { // simula carga de backend
    if (email === this.USER.email && password === this.USER.password) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Verifique email y password.';
      this.myForm.get('password')?.reset();
    }

    this.isLoading.set(false);

  }, 1200);
}

}
