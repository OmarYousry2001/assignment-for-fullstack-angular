import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl
} from '@angular/forms';
import { IdentityService } from '../identity-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formGroup!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private _identityService: IdentityService,
    private router: Router,
    private _toaService: ToastrService
  ) {}

  ngOnInit(): void {
    this.FormValidation();
  }

  FormValidation() {
    this.formGroup = this.fb.group(
      {
        userName: [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/
            ),
          ],
        ],
        passwordConfirmation: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator for password confirmation
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('passwordConfirmation')?.value;
    if (password !== confirm) {
      control.get('passwordConfirmation')?.setErrors({ mismatch: true });
    } else {
      control.get('passwordConfirmation')?.setErrors(null);
    }
    return null;
  }

  // Getters
  get _userName() {
    return this.formGroup.get('userName');
  }
  get _email() {
    return this.formGroup.get('email');
  }
  get _password() {
    return this.formGroup.get('password');
  }
  get _passwordConfirmation() {
    return this.formGroup.get('passwordConfirmation');
  }

  Submit() {
    if (this.formGroup.valid) {
      this._identityService.Register(this.formGroup.value).subscribe({
        next: () => {
          this._toaService.success('Account created successfully!', 'Register');
          this.router.navigateByUrl('/account/Login');
        },
        error: (er) => {
          this._toaService.error(er.error.message, 'Error');
        },
      });
    }
  }

  
  goBack() {
  window.history.back();
}
}
