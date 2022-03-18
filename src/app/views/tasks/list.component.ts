import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { StatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/status.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TaskListComponent implements OnInit {
  groups: string[] = [];

  columnUnassigned: DataTableColumnDef[] = [
    { id: 'name', label: 'Project name' },
    { id: 'task', label: 'Task' },
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

  columnAssigned: DataTableColumnDef[] = [
    { id: 'name', label: 'Project name' },
    { id: 'task', label: 'Task' },
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
    {
      id: 'action',
      label: 'Action',
      width: '10%',
      renderer: ActionDataTableRendererComponent,
    },
  ];

  columnCompleted: DataTableColumnDef[] = [
    { id: 'project', label: 'Project name' },
    { id: 'task', label: 'Task' },
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

  dataUnassigned: any[] = [];
  dataAssigned: any[] = [];
  dataCompleted: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRolesAndMenu();
  }

  async loadRolesAndMenu(): Promise<void> {
    const user = await Auth.currentAuthenticatedUser();
    this.groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    this.loadUnAssignedTask();
  }

  loadUnAssignedTask(): void {
    if (this.groups.indexOf('design') > -1) {
      this.dataUnassigned.push({
        id: 1,
        name: 'House remodelling',
        task: 'Architectural Design',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(1);
          },
        },
      });
    }
  }

  assign(toAssign: number): void {
    const index = this.dataUnassigned.findIndex(({ id }) => id === toAssign);
    const item = this.dataUnassigned[index];

    if (item) {
      this.dataAssigned.push({
        ...item,
        status: 'inprogress',
        action: {
          label: 'View',
          handler: () => {
            this.router.navigate(['/task', toAssign]);
          },
        },
      });

      this.dataUnassigned.splice(index, 1);
    }
  }
}
