import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('signIn', { static: false }) signIn: NgForm;

  signInForm: FormGroup;
  isFormSubmited: boolean;
  isSubmitting: boolean;
  formErorr: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initSignInForm();
  }

  submit() {
    if (this.signInForm.valid) {
      this.formErorr = null;
      this.isSubmitting = true;
      this.authService
        .signin(this.signInForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.formErorr = error.error;
            return throwError(error);
          })
        )
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.resetSignInForm();
            this.isSubmitting = false;
            this.router.navigateByUrl('/about-us');
          }
        });
    }
    this.isFormSubmited = true;
  }

  showErrors(field: AbstractControl): boolean {
    return field.invalid && (field.touched || this.isFormSubmited);
  }

  private initSignInForm() {
    this.signInForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [null, Validators.required]
    });
  }

  private resetSignInForm() {
    this.isFormSubmited = false;
    this.signInForm.reset();
    this.signInForm.updateValueAndValidity();
    this.signIn.resetForm();
  }
}
