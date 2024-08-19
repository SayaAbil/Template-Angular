import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {ResetPasswordAction} from "./reset-password.actions";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordDispatcher {

  @Dispatch()
  public _ResetPassword(username: string, data: {currentPass: string, newPass: string}) {
    return new ResetPasswordAction.ResetPassword(username, data)
  }
}
