import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard.component';
import { MaterialRequestComponent } from './views/material-request.component';
import { MaterialRequestListComponent } from './views/material-request/list.component';
import { ProgressReportComponent } from './views/progress-report.component';
import { ProgressReportListComponent } from './views/progress-report/list.component';
import { ProjectsComponent } from './views/projects.component';
import { AddProjectComponent } from './views/projects/add.component';
import { ProjectListComponent } from './views/projects/list.component';
import { ViewProjectComponent } from './views/projects/view.component';
import { TasksComponent } from './views/tasks.component';
import { TaskDetailsComponent } from './views/tasks/details.component';
import { TaskListComponent } from './views/tasks/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: 'new',
        component: AddProjectComponent,
      },
      {
        path: ':id',
        component: ViewProjectComponent,
      },
    ],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: TaskListComponent,
      },
      {
        path: ':id',
        component: TaskDetailsComponent,
      },
    ],
  },
  {
    path: 'material-request',
    component: MaterialRequestComponent,
    children: [
      {
        path: '',
        component: MaterialRequestListComponent,
      },
    ],
  },
  {
    path: 'progress-report',
    component: ProgressReportComponent,
    children: [
      {
        path: '',
        component: ProgressReportListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
