import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Actions, ofActionCompleted, Select, Store} from "@ngxs/store";
import {Observable, Subject, takeUntil} from "rxjs";
import {AuthState} from "../../shared/auth/state/auth.state";
import {UserDomain} from "../user/domain/user.domain";
import {ResetPasswordAction} from "./state/reset-password.actions";
import {NotificationService} from "../../shared/services/notification.service";
import {ResetPasswordState} from "./state/reset-password.state";
import {Router} from "@angular/router";
import {RoutePathEnum} from "../../shared/enum/route-path.enum";
import {DateUtils} from "../../shared/utils/date.utils";
import {ResetPasswordService} from "./service/reset-password.service";
import { OverlayLoadingComponent } from "../../shared/component/overlay-loading/overlay-loading.component";
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    imports: [ReactiveFormsModule, OverlayLoadingComponent,PasswordModule,DividerModule]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @Select(AuthState.userData) userData$!: Observable<UserDomain>
  @Select(ResetPasswordState.isPasswordReset) isPasswordReset$!: Observable<boolean>

  private destroyer$ = new Subject();

  form!: FormGroup;
  isLoading: boolean = false;
  userData: UserDomain | undefined

  constructor(
    private fb: FormBuilder,
    private store$: Store,
    private action$: Actions,
    private router: Router,
    private ngZone: NgZone,
    private resetPasswordService: ResetPasswordService,
    private notificationService: NotificationService
  ) {
    this.userData$
      .pipe(
        takeUntil(this.destroyer$)
      )
      .subscribe(
      data => {
        this.userData = data
      }
    )

    this.isPasswordReset$
      .pipe(
        takeUntil(this.destroyer$)
      )
      .subscribe(
        isReset => {
          if (isReset) {
            this.notificationService.successNotification('Hi ' + this.userData?.username, DateUtils.GiveGreetingByCurrentTime() + ', please use this app wisely, Thanks')
            ngZone.run(() => {
              this.router.navigate([RoutePathEnum.DASHBOARD_PATH])
            })
          }
        }
      )

    this.action$
      .pipe(
        ofActionCompleted(ResetPasswordAction.ResetPassword),
        takeUntil(this.destroyer$)
      )
      .subscribe(() => this.isLoading = false)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      currentPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.destroyer$.next(true)
    this.destroyer$.complete()
  }

  onResetPass(data: { currentPass: string, newPass: string }) {
    this.isLoading = true

    if (this.isNewAndConfirmPassSame()) {
      this.resetPasswordService.onResetPassword(
        this.userData?.username != null ? this.userData.username : '',
        data
      )
    } else {
      this.notificationService.errorNotification("Password incorrect", "Your new password is mismatch with confirm password.")
      this.isLoading = false
    }
  }

  getCurrentPass() {
    return this.form.get("currentPass")
  }

  getNewPass() {
    return this.form.get("newPass")
  }

  getConfirmPass() {
    return this.form.get("confirmPass")
  }

  isValueNotValid() {
    return this.getCurrentPass()?.hasError("required") || this.getNewPass()?.hasError("required") || this.getConfirmPass()?.hasError("required") || !this.isPasswordNotWeak()
  }

  isNewAndConfirmPassSame() {
    return this.getConfirmPass()?.value == this.getNewPass()?.value
  }

  isPasswordNotWeak() {
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
    return mediumRegex.test(this.getNewPass()?.value) || strongRegex.test(this.getNewPass()?.value)
  }
}
