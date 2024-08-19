import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

export const serviceProviderConfig = [
  { provide: MessageService, useClass: MessageService },
  { provide: DialogService, useClass: DialogService },
  { provide: ConfirmationService, useClass: ConfirmationService },
  { provide: DynamicDialogRef, useClass: DynamicDialogRef },
  
];
