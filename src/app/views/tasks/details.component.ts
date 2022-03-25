import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountingApprovalTaskComponent } from './type/accounting-approval-task.component';
import { ApproveMaterialRequestComponent } from './type/approve-material-request.component';
import { ApproveProgressReportComponent } from './type/approve-progress-report.component';
import { ClientApprovalTaskComponent } from './type/client-approval-task.component';
import { CostEstimateApprovalTaskComponent } from './type/cost-estimate-approval-task.component';
import { CostEstimateTaskComponent } from './type/cost-estimate-task.component';
import { DesignTaskComponent } from './type/design-task.component';
import { ForPurchaseOrderComponent } from './type/for-purchase-order.component';
import { ProcurementTaskComponent } from './type/procurement-task.component';
import { ScheduleProjectTaskComponent } from './type/schedule-project-task.component';
import { StakeholderApprovalTaskComponent } from './type/stakeholder-approval-task.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskComponent: Record<string, Type<unknown>> = {
    design: DesignTaskComponent,
    procurement: ProcurementTaskComponent,
    'cost-estimate': CostEstimateTaskComponent,
    'cost-estimate-approval': CostEstimateApprovalTaskComponent,
    'schedule-project': ScheduleProjectTaskComponent,
    'accounting-approval': AccountingApprovalTaskComponent,
    'stakeholder-approval': StakeholderApprovalTaskComponent,
    'client-approval': ClientApprovalTaskComponent,
    'approve-material-request': ApproveMaterialRequestComponent,
    'approve-progress-report': ApproveProgressReportComponent,
    'for-purchase-order': ForPurchaseOrderComponent,
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TO-DO: Task type should be determine from task data
    const taskType = this.getTaskType(
      this.activatedRoute.snapshot.params['id']
    );

    this.viewContainerRef.createComponent(this.taskComponent[taskType]);
  }

  getTaskType(id: string): string {
    return {
      '1': 'design',
      '2': 'cost-estimate',
      '3': 'procurement',
      '4': 'cost-estimate-approval',
      '5': 'schedule-project',
      '6': 'accounting-approval',
      '7': 'stakeholder-approval',
      '8': 'client-approval',
      '9': 'approve-material-request',
      '10': 'approve-progress-report',
      '11': 'for-purchase-order',
    }[id];
  }
}
