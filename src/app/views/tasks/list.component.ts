import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { finalize } from 'rxjs';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { StatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/status.component';
import { Task } from 'src/app/models/task.model';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';

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
  ];

  dataUnassigned: any[] = [];
  dataAssigned: any[] = [];
  dataCompleted: any[] = [];

  loadingUnassignedTasks: boolean;
  loadingAssignedTasks: boolean;
  loadingCompletedTasks: boolean;

  constructor(
    private router: Router,
    private taskClientAPI: TaskClientApiService
  ) {}

  ngOnInit(): void {
    this.loadRolesAndMenu();
  }

  async loadRolesAndMenu(): Promise<void> {
    const user = await Auth.currentAuthenticatedUser();
    this.groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    this.loadUnassignedTasks();
    this.loadAssignedTasks();
    this.loadCompletedTasks();
  }

  loadUnassignedTasks(): void {
    this.loadingUnassignedTasks = true;
    this.taskClientAPI
      .getTasks('unassigned')
      .pipe(finalize(() => (this.loadingUnassignedTasks = false)))
      .subscribe((tasks: Task[]) => {
        this.dataUnassigned = tasks.map((task: Task) => ({
          id: task.id,
          name: task.project.name,
          date: task.date,
          task: this.getTaskName(task),
          action: {
            label: 'Assign',
            handler: () => {
              this.assign(task);
            },
          },
        }));
      });
  }

  loadAssignedTasks(): void {
    this.loadingAssignedTasks = true;
    this.taskClientAPI
      .getTasks('pending')
      .pipe(finalize(() => (this.loadingAssignedTasks = false)))
      .subscribe((tasks: Task[]) => {
        this.dataAssigned = tasks.map((task: Task) => ({
          id: task.id,
          name: task.project.name,
          date: task.date,
          task: this.getTaskName(task),
          status: task.status,
          action: {
            label: 'View',
            handler: () => {
              this.router.navigate(['/tasks', task.id]);
            },
          },
        }));
      });
  }

  loadCompletedTasks(): void {
    this.loadingCompletedTasks = true;
    this.taskClientAPI
      .getTasks('completed')
      .pipe(finalize(() => (this.loadingCompletedTasks = false)))
      .subscribe((tasks: Task[]) => {
        this.dataCompleted = tasks.map((task: Task) => ({
          id: task.id,
          name: task.project.name,
          date: task.date,
          task: this.getTaskName(task),
          status: task.status,
          action: {
            label: 'View',
            handler: () => {
              this.router.navigate(['/tasks', task.id]);
            },
          },
        }));
      });
  }

  assign(task: Task): void {
    this.taskClientAPI.assignTask(task).subscribe((accepted) => {
      if (accepted) {
        const index = this.dataUnassigned.findIndex(({ id }) => id === task.id);
        const item = this.dataUnassigned[index];

        if (item) {
          this.dataAssigned.push({
            ...item,
            status: 'PENDING',
            action: {
              label: 'View',
              handler: () => {
                this.router.navigate(['/tasks', task.id]);
              },
            },
          });

          this.dataUnassigned.splice(index, 1);
        }
      }
    });
  }

  getTaskName(task: Task): string {
    switch (task.type) {
      case 'FOR_ARCHITECTURAL_DESIGN':
        return 'For Architectural Design';

      case 'DEFINE_SCOPE_OF_WORK':
        return 'Define scope of work';

      case 'PRICE_CANVASSING':
        return 'Material Price Canvassing';

      case 'SCHEDULE_PROJECT':
        return 'Schedule Project';

      case 'COST_ESTIMATE_APPROVAL':
        return 'Finalize Cost Estimate';

      case 'ACCOUNTING_APPROVAL':
      case 'STATEKHOLDER_APPROVAL':
      case 'MATERIAL_REQUEST_APPROVAL':
      case 'MATERIAL_REQUEST_APPROVAL_CE':
      case 'PROGRESS_APPROVAL':
      case 'PROGRESS_APPROVAL_CE':
        return 'For Approval';

      case 'FOR_PURCHASE_ORDER':
        return 'For PO';

      case 'CLIENT_APPROVAL':
        return `For Client's Approval`;
    }

    return 'Unknown';
  }
}
