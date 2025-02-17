export namespace DashboardAction {
export class TransactionGetActivity {
  static readonly type = '[Dashboard] FetchAllTransactionActivity'
}

export class TransactionGetStatus {
  static readonly type = '[Dashboard] FetchAllTransactionStatus'
}

export class DashboardGetAlertCaseAnalytic {
  static readonly type = '[Dashboard] FetchAllAlertCaseAnalytic'
}

export class DashboardGetTopRuleTriggered {
  static readonly type = '[Dashboard] FetchAllTopRuleTriggered'
}

export class DashboardGetTransactionStatus {
  static readonly type = '[Dashboard] FetchTransactionStatusByDate'
  constructor(public id: number) {}
}

export class DashboardGetAllInformation {
  static readonly type = '[Dashboard] FetchAllInformation'
}

export class DashboardResetAllInformation {
  static readonly type = '[Dashboard] ResetAllInformation'
}
}
