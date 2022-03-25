import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard.component';
import { MaterialRequestComponent } from './views/material-request.component';
import { AddMaterialRequestComponent } from './views/material-request/add.component';
import { MaterialRequestListComponent } from './views/material-request/list.component';
import { ViewMaterialRequestComponent } from './views/material-request/view.component';
import { ProgressReportComponent } from './views/progress-report.component';
import { AddProgressReportComponent } from './views/progress-report/add.component';
import { ProgressReportListComponent } from './views/progress-report/list.component';
import { ViewProgressReportComponent } from './views/progress-report/view.component';
import { ProjectsComponent } from './views/projects.component';
import { AddProjectComponent } from './views/projects/add.component';
import { ProjectListComponent } from './views/projects/list.component';
import { ViewProjectComponent } from './views/projects/view.component';
import { PurchaseOrdersComponent } from './views/purchase-orders.component';
import { AddPurchaseOrderComponent } from './views/purchase-orders/add.component';
import { PurchaseOrderListComponent } from './views/purchase-orders/list.component';
import { ViewPurchaseOrderComponent } from './views/purchase-orders/view.component';
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
      {
        path: 'new',
        component: AddMaterialRequestComponent,
      },
      {
        path: ':id',
        component: ViewMaterialRequestComponent,
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
      {
        path: 'new',
        component: AddProgressReportComponent,
      },
      {
        path: ':id',
        component: ViewProgressReportComponent,
      },
    ],
  },
  {
    path: 'purchase-orders',
    component: PurchaseOrdersComponent,
    children: [
      {
        path: '',
        component: PurchaseOrderListComponent,
      },
      {
        path: 'new',
        component: AddPurchaseOrderComponent,
      },
      {
        path: ':id',
        component: ViewPurchaseOrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
