import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TaskListComponent implements OnInit {
  groups: string[] = [];

  columnUnassigned: DataTableColumnDef[] = [
    { id: 'project', label: 'Project name' },
    { id: 'task', label: 'Task' },
    { id: 'date', label: 'Date', width: '10%' },
    { id: 'action', label: 'Action', width: '10%' },
  ];

  columnAssigned: DataTableColumnDef[] = [
    { id: 'project', label: 'Project name' },
    { id: 'task', label: 'Task' },
    { id: 'date', label: 'Date', width: '10%' },
    { id: 'status', label: 'Status', width: '10%' },
  ];

  dataUnassigned: any[] = [];
  dataAssigned: any[] = [];
  dataCompleted: any[] = [];

  constructor() {}

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
      });

      this.dataUnassigned.splice(index, 1);
    }
  }
}
