import { Component, Input, OnInit } from '@angular/core';

export interface DataTableColumnDef {
  id: string;
  label: string;
  width?: string;
  headerAlign?: 'left' | 'center' | 'right';
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
