import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {AuthAction} from "./auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthDispatcher {

  @Dispatch()
  public _AuthLogin(username: string, password: string) {
    return new AuthAction.AuthLogin(username, password)
  }

  @Dispatch()
  public _AuthLogout() {
    return new AuthAction.AuthLogout()
  }

  @Dispatch()
  public _AuthGetUserData() {
    return new AuthAction.AuthGetUserData()
  }

  @Dispatch()
  public _AuthTokenRefresh() {
    return new AuthAction.AuthTokenRefresh()
  }
}
