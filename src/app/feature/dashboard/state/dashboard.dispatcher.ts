import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import { DashboardAction } from "./dashboard.actions";

@Injectable({
  providedIn: 'root'
})
export class DashboardDispatcher {
  @Dispatch({ cancelUncompleted: true }) _FetchAllTransactionActivity = () => new DashboardAction.TransactionGetActivity();


  @Dispatch({ cancelUncompleted: true }) _FetchAllTransactionStatus = () => new DashboardAction.TransactionGetStatus();

  @Dispatch({ cancelUncompleted: true }) _FetchAllAlertCaseAnalytic = () => new DashboardAction.DashboardGetAlertCaseAnalytic();


  @Dispatch({ cancelUncompleted: true }) _FetchAllTopRuleTriggered = () => new DashboardAction.DashboardGetTopRuleTriggered();


  @Dispatch({cancelUncompleted:true}) _FetchDashboardTransactionStatus = (id: number) => new DashboardAction.DashboardGetTransactionStatus(id)

  @Dispatch({cancelUncompleted:true}) _FetchAllInformation = () => new DashboardAction.DashboardGetAllInformation();

  @Dispatch({cancelUncompleted:true}) _ResetAllInformation = () => new DashboardAction.DashboardResetAllInformation();
}
