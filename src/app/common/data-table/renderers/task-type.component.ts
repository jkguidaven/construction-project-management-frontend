import { Component, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.scss'],
})
export class TaskTypeDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor() {}

  ngOnInit(): void {}

  get text(): string {
    return this.getTaskName(this.data[this.field]);
  }

  getTaskName(type: string): string {
    switch (type) {
      case 'FOR_ARCHITECTURAL_DESIGN':
        return 'For Architectural Design';

      case 'DEFINE_SCOPE_OF_WORK':
        return 'Define scope of work';

      case 'PRICE_CANVASSING':
        return 'Material Price Canvassing';

      case 'SCHEDULE_PROJECT':
        return 'Schedule Project';

      case 'COST_ESTIMATE_APPROVAL':
        return 'Finalize Cost Estimate';

      case 'ACCOUNTING_APPROVAL':
        return 'Accounting - Approval';
      case 'STATEKHOLDER_APPROVAL':
        return 'Project Management - Approval';
      case 'MATERIAL_REQUEST_APPROVAL':
        return 'Material Request QS - Approval';
      case 'MATERIAL_REQUEST_APPROVAL_CE':
        return 'Material Request CE - Approval';
      case 'PROGRESS_APPROVAL':
        return 'Progress Report QS - Approval';
      case 'PROGRESS_APPROVAL_CE':
        return 'Progress Report CE - Approval';

      case 'FOR_PURCHASE_ORDER':
        return 'For PO';

      case 'CLIENT_APPROVAL':
        return `Client - Approval`;
    }

    return 'Unknown';
  }
}
