import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PurchaseOrderListComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    { id: 'id', label: 'PO #' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'project', label: 'Project' },
    { id: 'total', label: 'Total' },
    {
      id: 'date',
      label: 'Date',
      width: '10%',
      renderer: DateDataTableRendererComponent,
    },
    {
      id: 'action',
      label: 'Action',
      width: '10%',
      renderer: ActionDataTableRendererComponent,
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
