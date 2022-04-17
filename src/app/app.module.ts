import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material Modules */
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

/* Other 3rd party library */
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/* Add Amplify imports */
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

/* internal components */
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './views/dashboard.component';
import { ProjectsComponent } from './views/projects.component';
import { UserMenuComponent } from './common/user-menu/user-menu.component';
import { UserProfileComponent } from './views/modals/user-profile.component';
import { ChangePasswordComponent } from './views/modals/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { PageComponent } from './layouts/page/page.component';
import { CardComponent } from './common/card/card.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { AddProjectComponent } from './views/projects/add.component';
import { ProjectListComponent } from './views/projects/list.component';
import { ViewProjectComponent } from './views/projects/view.component';
import { FormRowComponent } from './common/form/row.component';
import { StatusBarComponent } from './common/status-bar/status-bar.component';
import { AttachmentCardComponent } from './common/attachment-card/attachment-card.component';
import { GanttChartComponent } from './common/charts/gantt-chart/gantt-chart.component';
import { ViewProjectScheduleComponent } from './views/projects/view-project-schedule.component';
import { TasksComponent } from './views/tasks.component';
import { TaskListComponent } from './views/tasks/list.component';
import { TaskDetailsComponent } from './views/tasks/details.component';
import { DesignTaskComponent } from './views/tasks/type/design-task.component';
import { CostEstimateTaskComponent } from './views/tasks/type/cost-estimate-task.component';
import { ProcurementTaskComponent } from './views/tasks/type/procurement-task.component';
import { CostEstimateApprovalTaskComponent } from './views/tasks/type/cost-estimate-approval-task.component';
import { AccountingApprovalTaskComponent } from './views/tasks/type/accounting-approval-task.component';
import { StakeholderApprovalTaskComponent } from './views/tasks/type/stakeholder-approval-task.component';
import { ActionPanelComponent } from './common/action-panel/action-panel.component';
import { UploadFileDropboxComponent } from './common/upload-file-dropbox/upload-file-dropbox.component';
import { UploadFileDropboxDirective } from './common/upload-file-dropbox/upload-file-dropbox.directive';
import { AddScopeComponent } from './views/modals/add-scope.component';
import { AddScopeOfWorkTaskComponent } from './views/modals/add-scope-of-work-task.component';
import { AddScopeOfWorkMaterialComponent } from './views/modals/add-scope-of-work-material.component';
import { AddScopeOfWorkMaterialPriceComponent } from './views/modals/add-scope-of-work-material-price.component';
import { AddScopeOfWorkTaskSubconBudgetComponent } from './views/modals/add-scope-of-work-task-subcon-budget.component';
import { AddScopeOfWorkMaterialSubconBudgetComponent } from './views/modals/add-scope-of-work-material-subcon-budget.component';
import { ScheduleProjectTaskComponent } from './views/tasks/type/schedule-project-task.component';
import { ProjectScheduleViewerComponent } from './common/project-schedule-viewer/project-schedule-viewer.component';
import { ProjectOverviewViewerComponent } from './common/project-overview-viewer/project-overview-viewer.component';
import { ProjectCostSummaryViewerComponent } from './common/project-cost-summary-viewer/project-cost-summary-viewer.component';
import { ClientApprovalTaskComponent } from './views/tasks/type/client-approval-task.component';
import { TextDataTableRendererComponent } from './common/data-table/renderers/text.component';
import { LinkDataTableRendererComponent } from './common/data-table/renderers/link.component';
import { DateDataTableRendererComponent } from './common/data-table/renderers/date.component';
import { StatusDataTableRendererComponent } from './common/data-table/renderers/status.component';
import { ActionDataTableRendererComponent } from './common/data-table/renderers/action.component';
import { RendererLoaderDirective } from './common/data-table/renderer-loader.directive';
import { AddProjectScheduleComponent } from './views/modals/add-project-schedule.component';
import { MaterialRequestComponent } from './views/material-request.component';
import { ProgressReportComponent } from './views/progress-report.component';
import { MaterialRequestListComponent } from './views/material-request/list.component';
import { ProgressReportListComponent } from './views/progress-report/list.component';
import { AddProgressReportComponent } from './views/progress-report/add.component';
import { AddMaterialRequestComponent } from './views/material-request/add.component';
import { ViewMaterialRequestComponent } from './views/material-request/view.component';
import { ViewProgressReportComponent } from './views/progress-report/view.component';
import { ApproveMaterialRequestComponent } from './views/tasks/type/approve-material-request.component';
import { ApproveProgressReportComponent } from './views/tasks/type/approve-progress-report.component';
import { ForPurchaseOrderComponent } from './views/tasks/type/for-purchase-order.component';
import { PurchaseOrdersComponent } from './views/purchase-orders.component';
import { PurchaseOrderListComponent } from './views/purchase-orders/list.component';
import { ViewPurchaseOrderComponent } from './views/purchase-orders/view.component';
import { AddPurchaseOrderComponent } from './views/purchase-orders/add.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectStatusDataTableRendererComponent } from './common/data-table/renderers/project-status.component';
import { MaterialRequestStatusDataTableRendererComponent } from './common/data-table/renderers/material-request-status.component';
import { FinalApproveMaterialRequestComponent } from './views/tasks/type/final-approve-material-request.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MainComponent,
    DashboardComponent,
    ProjectsComponent,
    UserMenuComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    PageComponent,
    CardComponent,
    DataTableComponent,
    AddProjectComponent,
    ProjectListComponent,
    FormRowComponent,
    ViewProjectComponent,
    StatusBarComponent,
    AttachmentCardComponent,
    GanttChartComponent,
    ViewProjectScheduleComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailsComponent,
    DesignTaskComponent,
    CostEstimateTaskComponent,
    ProcurementTaskComponent,
    CostEstimateApprovalTaskComponent,
    AccountingApprovalTaskComponent,
    StakeholderApprovalTaskComponent,
    ActionPanelComponent,
    UploadFileDropboxComponent,
    UploadFileDropboxDirective,
    AddScopeComponent,
    AddScopeOfWorkTaskComponent,
    AddScopeOfWorkMaterialComponent,
    AddScopeOfWorkMaterialPriceComponent,
    AddScopeOfWorkTaskSubconBudgetComponent,
    AddScopeOfWorkMaterialSubconBudgetComponent,
    ScheduleProjectTaskComponent,
    ProjectScheduleViewerComponent,
    ProjectOverviewViewerComponent,
    ProjectCostSummaryViewerComponent,
    ClientApprovalTaskComponent,
    TextDataTableRendererComponent,
    DateDataTableRendererComponent,
    StatusDataTableRendererComponent,
    ActionDataTableRendererComponent,
    RendererLoaderDirective,
    AddProjectScheduleComponent,
    LinkDataTableRendererComponent,
    MaterialRequestComponent,
    MaterialRequestListComponent,
    AddMaterialRequestComponent,
    ViewMaterialRequestComponent,
    ProgressReportComponent,
    ProgressReportListComponent,
    AddProgressReportComponent,
    ViewProgressReportComponent,
    ApproveMaterialRequestComponent,
    ApproveProgressReportComponent,
    ForPurchaseOrderComponent,
    PurchaseOrdersComponent,
    PurchaseOrderListComponent,
    ViewPurchaseOrderComponent,
    AddPurchaseOrderComponent,
    ProjectStatusDataTableRendererComponent,
    MaterialRequestStatusDataTableRendererComponent,
    FinalApproveMaterialRequestComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    HttpClientModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatNativeDateModule,
    NgxSkeletonLoaderModule,
    NgxChartsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
