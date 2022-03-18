import { Component, Input, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderers/renderer';

export interface DataTableColumnDef {
  id: string;
  label: string;
  width?: string;
  headerAlign?: 'left' | 'center' | 'right';
  renderer?: InstanceType<any>;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() columns!: DataTableColumnDef[];
  @Input() data!: any[];

  constructor() {}

  ngOnInit(): void {}
}
