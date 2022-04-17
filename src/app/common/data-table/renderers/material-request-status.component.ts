import { Component, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-material-request-status',
  templateUrl: './material-request-status.component.html',
  styleUrls: ['./material-request-status.component.scss'],
})
export class MaterialRequestStatusDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;
  constructor() {}

  ngOnInit(): void {}

  get color(): string {
    const status = this.data[this.field];
    switch (status) {
      case 'PENDING':
        return '#a4a6b3';

      case 'APPROVED':
        return '#aba328';

      case 'FINAL_APPROVED':
        return '#1bb55c';

      case 'REJECTED':
        return 'red';
    }

    return 'lightgrey';
  }

  get text(): string {
    const status = this.data[this.field];
    switch (status) {
      case 'PENDING':
        return 'Waiting Approval';

      case 'APPROVED':
        return 'QS Approved';

      case 'FINAL_APPROVED':
        return 'CE Approved';

      case 'REJECTED':
        return 'rejected';
    }

    return status;
  }
}
