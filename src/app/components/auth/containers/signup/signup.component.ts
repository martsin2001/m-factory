import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  NgForm
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUp', { static: false }) signUp: NgForm;

  signUpForm: FormGroup;
  isFormSubmited: boolean;
  isSubmitting: boolean;
  formErorr: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initsignUpForm();
  }

  submit() {
    if (this.signUpForm.valid) {
      this.formErorr = null;
      this.isSubmitting = true;
      this.authService
        .signup(this.signUpForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.formErorr = error.error;
            return throwError(error);
          })
        )
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.resetsignUpForm();
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

  private initsignUpForm() {
    this.signUpForm = this.fb.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [null, Validators.required]
    });
  }

  private resetsignUpForm() {
    this.isFormSubmited = false;
    this.signUpForm.reset();
    this.signUpForm.updateValueAndValidity();
    this.signUp.resetForm();
  }
}
