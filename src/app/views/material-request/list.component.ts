import { Component, OnInit } from '@angular/core';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class MaterialRequestListComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    {
      id: 'name',
      label: 'Project name',
    },
    { id: 'customer', label: 'Customer name' },
    { id: 'scope', label: 'Scope of work' },
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

  data: any = [
    {
      id: 1,
      name: 'House remodelling',
      customer: 'James Kenneth A. Guidaven',
      scope: 'Retaining walls',
      date: new Date(),
      action: {
        label: 'View',
        handler: () => {},
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
