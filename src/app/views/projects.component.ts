import { Component, OnInit } from '@angular/core';
import { DataTableColumnDef } from '../common/data-table/data-table.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
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
