import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChatState } from 'src/app/core/chat/chat.reducer';
import { ClearUp } from 'src/app/core/chat/chat.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('signIn', { static: false }) signIn: NgForm;

  signInForm: FormGroup;
  isFormSubmited: boolean;
  isSubmitting: boolean;
  formErorr: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<ChatState>
  ) {}

  ngOnInit() {
    this.removeToken();
    this.clearUpRedux();
    this.initSignInForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
            this.isSubmitting = false;
            return throwError(error);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.resetSignInForm();
            this.isSubmitting = false;
            localStorage.setItem('key', JSON.parse(res.body).userKey);
            this.router.navigateByUrl('/main-toolbar');
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

  private clearUpRedux() {
    this.store.dispatch(new ClearUp());
  }
}
