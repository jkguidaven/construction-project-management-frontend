import { Component, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor() {}

  ngOnInit(): void {}

  get color(): string {
    switch (this.data[this.field]) {
      case 'PENDING':
        return '#E8D52E';
      case 'COMPLETED':
        return '#449D25';
    }

    return 'lightgrey';
  }
}
