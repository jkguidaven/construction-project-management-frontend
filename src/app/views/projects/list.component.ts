import { Component, OnInit } from '@angular/core';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { LinkDataTableRendererComponent } from 'src/app/common/data-table/renderers/link.component';
import { StatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/status.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    {
      id: 'name',
      label: 'Project name',
      renderer: LinkDataTableRendererComponent,
    },
    { id: 'customer', label: 'Customer name' },
    {
      id: 'date',
      label: 'Date',
      width: '10%',
      renderer: DateDataTableRendererComponent,
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      renderer: StatusDataTableRendererComponent,
    },
  ];

  data: any = [
    {
      id: 1,
      name: 'House remodelling',
      customer: 'James Kenneth A. Guidaven',
      date: new Date(),
      status: 'Design',
      link: ['/projects', 1],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
