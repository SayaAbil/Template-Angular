import {Injectable} from '@angular/core';
import {CustomHttpResponse} from "../../../shared/domain/customHttpResponse";
import {RoutePathEnum} from "../../../shared/enum/route-path.enum";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TransactionActivityDomain} from "../domain/transaction-activity.domain";
import {DashboardDispatcher} from "../state/dashboard.dispatcher";
import {AlertCaseAnalyticDomain} from "../domain/alert-case-analytic.domain";
import {TopRuleTriggeredDomain} from "../domain/top-rule-triggered.domain";
import { TransactionStatusDomain } from '../domain/transaction-status.domain';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.dev_env

  constructor(
    private http: HttpClient,
    private dashboardDispatcher: DashboardDispatcher
  ) {
  }

  fetchTransactionActivity() {
    return this.http.get<CustomHttpResponse<TransactionActivityDomain[]>>(`${this.apiUrl}/${RoutePathEnum.TRANSACTION_ACTIVITY_PATH}`);
  }

  fetchTransactionStatus() {
    return this.http.get<CustomHttpResponse<TransactionStatusDomain[]>>(`${this.apiUrl}/${RoutePathEnum.TRANSACTION_ACTIVITY_STATUS_GET_PATH}`);
  }

  fetchTransactionStatusByDate(id: number) {
    const params = new HttpParams().set('dateType', id)
    return this.http.get<CustomHttpResponse<TransactionStatusDomain[]>>(`${this.apiUrl}/${RoutePathEnum.TRANSACTION_ACTIVITY_STATUS_BY_DATE_GET_PATH}/`, {params});
  }

  fetchAlertCaseAnalytic() {
    return this.http.get<CustomHttpResponse<AlertCaseAnalyticDomain>>(`${this.apiUrl}/${RoutePathEnum.ALERT_CASE_ANALYTIC_PATH}`);
  }

  fetchTopRuleTriggered() {
    return this.http.get<CustomHttpResponse<TopRuleTriggeredDomain[]>>(`${this.apiUrl}/${RoutePathEnum.TOP_TRIGGERED_RULE_PATH}`);
  }

  onFetchTransactionStatus() {
    this.dashboardDispatcher._FetchAllTransactionStatus();
  }

  onFetchTransactionStatusByDate(id: number) {
    this.dashboardDispatcher._FetchDashboardTransactionStatus(id)
  }

  onFetchAllInformation() {
    this.dashboardDispatcher._FetchAllInformation()
  }

  onResetAllInformation() {
    this.dashboardDispatcher._ResetAllInformation()
  }
}
