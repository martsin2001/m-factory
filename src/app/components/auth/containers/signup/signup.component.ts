import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  NgForm
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('signUp', { static: false }) signUp: NgForm;

  signUpForm: FormGroup;
  isFormSubmited: boolean;
  isSubmitting: boolean;
  formErorr: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.removeToken();
    this.initsignUpForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
            this.isSubmitting = false;
            return throwError(error);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.resetSignUpForm();
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

  private removeToken() {
    this.authService.removeToken();
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

  private resetSignUpForm() {
    this.isFormSubmited = false;
    this.signUpForm.reset();
    this.signUpForm.updateValueAndValidity();
    this.signUp.resetForm();
  }
}
