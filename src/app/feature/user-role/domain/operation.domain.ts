import {PrivilegeDomain} from "./privilege.domain";

export class OperationDomain {
  opId!: bigint
  opName: string = ''
  description: string = ''
  privileges: Array<PrivilegeDomain> = []
}
