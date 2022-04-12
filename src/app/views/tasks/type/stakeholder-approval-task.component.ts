import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-stakeholder-approval-task',
  templateUrl: './stakeholder-approval-task.component.html',
  styleUrls: ['./stakeholder-approval-task.component.scss'],
})
export class StakeholderApprovalTaskComponent implements OnInit, TaskHandler {
  @Input() task!: Task;
  @Input() project!: Project;
  @Input() scopes: ScopeOfWork[] = [];

  profitControl: FormControl = new FormControl(0, [Validators.required]);

  constructor(
    private router: Router,
    private taskClientAPI: TaskClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService
  ) {}

  ngOnInit(): void {}

  getMaterialCost(scope: ScopeOfWork): number {
    let materials: ScopeOfWorkTaskMaterial[] = [];

    for (let task of scope.tasks) {
      materials = [...materials, ...task.materials];
    }

    return materials.reduce((total, material) => {
      if (material.pricePerUnit && material.qty) {
        total += material.pricePerUnit * material.qty;
      }
      return total;
    }, 0);
  }

  getLaborCost(scope: ScopeOfWork): number {
    let total = 0;

    for (let task of scope.tasks) {
      if (task.subconPricePerUnit && task.qty) {
        total += task.subconPricePerUnit * task.qty;
      }

      for (let material of task.materials) {
        if (material.qty && material.subconPricePerUnit) {
          total += material.qty * material.subconPricePerUnit;
        }
      }
    }

    return total;
  }

  getSubTotal(scope: ScopeOfWork): number {
    return this.getLaborCost(scope) + this.getMaterialCost(scope);
  }

  get grandTotal(): number {
    return (
      this.scopes.reduce((total, scope) => total + this.getSubTotal(scope), 0) +
      (this.profitControl.value ?? 0)
    );
  }

  setTask(task: Task): void {
    this.task = task;

    if (this.task.status === 'COMPLETED') {
      this.profitControl.disable();
    }

    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;

      this.scopeOfWorkClientAPI
        .get(this.project.id)
        .subscribe((scopes: ScopeOfWork[]) => {
          this.scopes = scopes;
        });
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

  complete() {
    this.taskClientAPI.completeTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
