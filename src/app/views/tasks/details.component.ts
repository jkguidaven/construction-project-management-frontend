import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AccountingApprovalTaskComponent } from './type/accounting-approval-task.component';
import { ApproveMaterialRequestComponent } from './type/approve-material-request.component';
import { ApproveProgressReportComponent } from './type/approve-progress-report.component';
import { ClientApprovalTaskComponent } from './type/client-approval-task.component';
import { CostEstimateApprovalTaskComponent } from './type/cost-estimate-approval-task.component';
import { CostEstimateTaskComponent } from './type/cost-estimate-task.component';
import { DesignTaskComponent } from './type/design-task.component';
import { FinalApproveMaterialRequestComponent } from './type/final-approve-material-request.component';
import { ForPurchaseOrderComponent } from './type/for-purchase-order.component';
import { ProcurementTaskComponent } from './type/procurement-task.component';
import { ScheduleProjectTaskComponent } from './type/schedule-project-task.component';
import { StakeholderApprovalTaskComponent } from './type/stakeholder-approval-task.component';
import { TaskHandler } from './type/task-handler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskComponent: Record<string, Type<unknown>> = {
    FOR_ARCHITECTURAL_DESIGN: DesignTaskComponent,
    PRICE_CANVASSING: ProcurementTaskComponent,
    DEFINE_SCOPE_OF_WORK: CostEstimateTaskComponent,
    COST_ESTIMATE_APPROVAL: CostEstimateApprovalTaskComponent,
    SCHEDULE_PROJECT: ScheduleProjectTaskComponent,
    ACCOUNTING_APPROVAL: AccountingApprovalTaskComponent,
    STATEKHOLDER_APPROVAL: StakeholderApprovalTaskComponent,
    CLIENT_APPROVAL: ClientApprovalTaskComponent,
    MATERIAL_REQUEST_APPROVAL: ApproveMaterialRequestComponent,
    MATERIAL_REQUEST_APPROVAL_CE: FinalApproveMaterialRequestComponent,
    PROGRESS_APPROVAL: ApproveProgressReportComponent,
    FOR_PURCHASE_ORDER: ForPurchaseOrderComponent,
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private taskClientAPI: TaskClientApiService
  ) {}

  ngOnInit(): void {
    this.taskClientAPI
      .getTask(this.activatedRoute.snapshot.params['id'] as number)
      .subscribe((task: Task) => {
        const componentRef = this.viewContainerRef.createComponent(
          this.taskComponent[task.type]
        );
        (<TaskHandler>componentRef.instance).setTask(task);
      });
  }
}
