import { Component, OnInit } from '@angular/core';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProjectListComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    { id: 'project', label: 'Project Details' },
    { id: 'customer', label: 'Customer Name' },
    { id: 'date', label: 'Date', width: '10%' },
    { id: 'status', label: 'Status', width: '10%'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
