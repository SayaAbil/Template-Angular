import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Actions, ofActionCompleted, Select} from "@ngxs/store";
import {AuthState} from "./shared/auth/state/auth.state";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserDomain} from "./feature/user/domain/user.domain";
import {AuthAction} from "./shared/auth/state/auth.actions";
import { RouterOutlet, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AuthState.userData) userData$!: Observable<UserDomain>

  private destroyer$ = new Subject();

  title = 'FDS-UI=NEW';
  showFiller = false;
  isLoading: boolean = true;
  userData: UserDomain | undefined

  constructor(
    private action$: Actions,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.onGetUserData()
    } else {
      this.authService.onLogout()
      this.isLoading = false
    }

    this.userData$.pipe(
      takeUntil(this.destroyer$)
    ).subscribe(data => {
      this.userData = data
    })

    this.action$.pipe(
      ofActionCompleted(AuthAction.AuthGetUserData),
      takeUntil(this.destroyer$)
    ).subscribe(() => {
      this.isLoading = false
    })
  }

  ngOnDestroy() {
    this.destroyer$.complete()
  }
}
