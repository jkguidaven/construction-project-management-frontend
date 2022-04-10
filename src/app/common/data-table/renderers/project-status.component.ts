import { Component, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss'],
})
export class ProjectStatusDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor() {}

  ngOnInit(): void {}

  get color(): string {
    const status = this.data[this.field];
    switch (status) {
      case 'DESIGN':
        return '#a4a6b3';

      case 'DEFINE_SCOPE':
      case 'COST_ESTIMATE':
        return '#aba328';

      case 'ACCOUNTING_APPROVAL':
      case 'STATEKHOLDER_APPROVAL':
      case 'CLIENT_APPROVAL':
        return '#aba328';

      case 'STARTED':
        return '#1b59b5';

      case 'COMPLETED':
        return '#1bb55c';

      case 'CANCELLED':
        return 'red';
    }

    switch (this.data[this.field]) {
      case 'inprogress':
        return '#E8D52E';
      case 'completed':
        return '#449D25';
    }

    return 'lightgrey';
  }

  get text(): string {
    const status = this.data[this.field];
    switch (status) {
      case 'DESIGN':
        return 'Project Design';

      case 'DEFINE_SCOPE':
      case 'COST_ESTIMATE':
        return 'Cost Estimate';

      case 'ACCOUNTING_APPROVAL':
      case 'STATEKHOLDER_APPROVAL':
      case 'CLIENT_APPROVAL':
        return 'Project Approval';

      case 'STARTED':
        return 'Active';

      case 'COMPLETED':
        return 'Completed';

      case 'CANCELLED':
        return 'Cancelled';
    }

    return status;
  }
}
