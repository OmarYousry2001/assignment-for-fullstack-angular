import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IdentityService } from '../identity-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule , RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formGroup!: FormGroup;
  emailModel: string = '';
  password = false;

  returnUrl: string = '';
  constructor(
    private fb: FormBuilder,
    private _identityService: IdentityService,
    private route: ActivatedRoute,
    private router: Router,
    private _toaService: ToastrService
  ) {}

  ngOnInit(): void {
    this.FormValidation();
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
  }

  FormValidation() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
    });
  }

  // return FormControl
  get _email() {
    return this.formGroup.get('email');
  }
  get _password() {
    return this.formGroup.get('password');
  }
  Submit() {
    if (this.formGroup.valid) {
      this._identityService.Login(this.formGroup.value).subscribe({
        next: (response) => {
          this._toaService.success('Welcome back!', 'Login successful');
          if (this.returnUrl && this.returnUrl!== '') {
            this.router.navigateByUrl(this.returnUrl); // Redirect to returnUrl or another page after login
          } else {
            this.router.navigateByUrl('/admin');
          }
        },
        error: (error) => {
          this._toaService.error(
            'Please check your Email or password and try again.',
            'Login Failed'
          );
        },
      });
    }
  }
}
