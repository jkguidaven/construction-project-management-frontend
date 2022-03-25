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

    if (this.groups.indexOf('qs') > -1) {
      this.dataUnassigned.push({
        id: 2,
        name: 'Building Mall',
        task: 'Define Scope of Work',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(2);
          },
        },
      });

      this.dataUnassigned.push({
        id: 9,
        name: 'House remodelling',
        task: 'Approve Material request',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(9);
          },
        },
      });

      this.dataUnassigned.push({
        id: 10,
        name: 'House remodelling',
        task: 'Approve Progress report',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(10);
          },
        },
      });
    }

    if (this.groups.indexOf('procurement') > -1) {
      this.dataUnassigned.push({
        id: 3,
        name: 'House remodelling',
        task: 'Price canvassing',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(3);
          },
        },
      });

      this.dataUnassigned.push({
        id: 11,
        name: 'House remodelling',
        task: 'For PO',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(11);
          },
        },
      });
    }

    if (this.groups.indexOf('ce') > -1) {
      this.dataUnassigned.push({
        id: 4,
        name: 'House remodelling',
        task: 'For Review',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(4);
          },
        },
      });
    }

    if (this.groups.indexOf('operation') > -1) {
      this.dataUnassigned.push({
        id: 5,
        name: 'House remodelling',
        task: 'For Schedule',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(5);
          },
        },
      });
    }

    if (this.groups.indexOf('accounting') > -1) {
      this.dataUnassigned.push({
        id: 6,
        name: 'House remodelling',
        task: 'For Review',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(6);
          },
        },
      });

      this.dataUnassigned.push({
        id: 8,
        name: 'House remodelling',
        task: 'For Client Approval',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(8);
          },
        },
      });
    }

    if (this.groups.indexOf('stakeholder') > -1) {
      this.dataUnassigned.push({
        id: 7,
        name: 'House remodelling',
        task: 'For Review',
        date: new Date(),
        action: {
          label: 'Assigned',
          handler: () => {
            this.assign(7);
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
            this.router.navigate(['/tasks', toAssign]);
          },
        },
      });

      this.dataUnassigned.splice(index, 1);
    }
  }
}
