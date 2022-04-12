import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { GroupTask } from 'src/app/common/charts/gantt-chart/gantt-chart.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AddScopeOfWorkMaterialSubconBudgetComponent } from '../../modals/add-scope-of-work-material-subcon-budget.component';
import { AddScopeOfWorkTaskSubconBudgetComponent } from '../../modals/add-scope-of-work-task-subcon-budget.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-cost-estimate-approval-task',
  templateUrl: './cost-estimate-approval-task.component.html',
  styleUrls: ['./cost-estimate-approval-task.component.scss'],
})
export class CostEstimateApprovalTaskComponent implements OnInit, TaskHandler {
  @Input() task!: Task;
  @Input() project!: Project;
  @Input() scopes!: ScopeOfWork[];

  saving: boolean;

  startDate: Date = new Date();
  endDate: Date = new Date(2023, 3, 5);
  groupTasks: GroupTask[] = [];

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private taskClientAPI: TaskClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getSubTotal(scope: ScopeOfWork): number {
    let total = 0;
    for (let task of scope.tasks) {
      if (task.subconPricePerUnit && task.qty) {
        total += task.subconPricePerUnit * task.qty;
      }

      for (let material of task.materials) {
        if (material.pricePerUnit && material.qty) {
          total += material.pricePerUnit * material.qty;
        }

        if (material.subconPricePerUnit && material.qty) {
          total += material.subconPricePerUnit * material.qty;
        }
      }
    }

    return total;
  }

  get grandTotal(): number {
    let total = 0;

    for (let scope of this.scopes) {
      total += this.getSubTotal(scope);
    }

    return total;
  }

  getTotalMaterialCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return total + (material.pricePerUnit * material.qty ?? 0);
    }, 0);
  }

  getTotalLaborCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return total + (material.subconPricePerUnit * material.qty ?? 0);
    }, 0);
  }

  showAddTaskSubconBudgetForm(task: ScopeOfWorkTask): void {
    const dialogRef = this.dialog.open(
      AddScopeOfWorkTaskSubconBudgetComponent,
      {
        data: task,
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.subconPricePerUnit = data.subconPricePerUnit;
      }
    });
  }

  showAddMaterialSubconBudgetForm(material: ScopeOfWorkTaskMaterial): void {
    const dialogRef = this.dialog.open(
      AddScopeOfWorkMaterialSubconBudgetComponent,
      {
        data: material,
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        material.subconPricePerUnit = data.subconPricePerUnit;
      }
    });
  }

  getAttachmentType(mime: string): 'pdf' | 'image' | 'document' {
    if (mime.startsWith('image/')) {
      return 'image';
    } else if (mime === 'application/pdf') return 'pdf';

    return 'document';
  }

  downloadAttachment(attachment: Attachment): void {
    this.attachmentClientAPI.downloadAttachment(this.project.id, attachment);
  }

  setTask(task: Task): void {
    this.task = task;

    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;

      this.scopeOfWorkClientAPI
        .get(this.project.id)
        .subscribe((scopes: ScopeOfWork[]) => {
          this.scopes = this.getNormalizedData(scopes);
        });
    });
  }

  getNormalizedData(scopes: ScopeOfWork[]): ScopeOfWork[] {
    return scopes.map((scope) => {
      scope.type = 'UPDATE';
      scope.tasks.forEach((task) => {
        task.type = 'UPDATE';

        task.materials.forEach((material) => {
          material.type = 'UPDATE';
        });
      });
      return scope;
    });
  }

  exit(): void {
    this.router.navigate(['/tasks']);
  }

  save(): Observable<ScopeOfWork[]> {
    this.saving = true;
    return this.scopeOfWorkClientAPI.define(this.project.id, this.scopes).pipe(
      finalize(() => (this.saving = false)),
      catchError(() => {
        this._snackBar.open(
          'Something went wrong while saving. please try again.',
          null,
          {
            duration: 3000,
            panelClass: 'error-snack-bar',
          }
        );
        return of(null);
      }),
      map((result) => {
        if (result) {
          this._snackBar.open('Successfully saved.', null, {
            duration: 3000,
            panelClass: 'success-snack-bar',
          });
        }
        return result;
      })
    );
  }

  complete() {
    this.save().subscribe((scopes: ScopeOfWork[]) => {
      if (scopes) {
        this.taskClientAPI.completeTask(this.task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    });
  }

  update(): void {
    this.save().subscribe((scope: ScopeOfWork[]) => {
      this.scopes = this.getNormalizedData(scope);
    });
  }
}
