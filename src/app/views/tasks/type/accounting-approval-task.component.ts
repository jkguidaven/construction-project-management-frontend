import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScheduleProjectClientApiService } from 'src/app/services/schedule-project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AddProjectScheduleComponent } from '../../modals/add-project-schedule.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-accounting-approval-task',
  templateUrl: './accounting-approval-task.component.html',
  styleUrls: ['./accounting-approval-task.component.scss'],
})
export class AccountingApprovalTaskComponent implements OnInit, TaskHandler {
  task!: Task;
  scopes: ScopeOfWork[] = [];
  schedules: TargetSchedule[] = [];
  project!: Project;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private taskClientAPI: TaskClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private scheduleProjectClientAPI: ScheduleProjectClientApiService
  ) {}

  ngOnInit(): void {}

  setTask(task: Task): void {
    this.task = task;

    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;

      this.scopeOfWorkClientAPI
        .get(this.project.id)
        .subscribe((scopes: ScopeOfWork[]) => {
          this.scopes = scopes;
          this.scopes = scopes.sort((a, b) => a.id - b.id);
          this.scopes.forEach((scope) => {
            scope.tasks = scope.tasks.sort((a, b) => a.id - b.id);
          });
        });

      this.scheduleProjectClientAPI
        .get(this.project.id)
        .subscribe((schedules: TargetSchedule[]) => {
          this.schedules = this.getNormalizedScheduleData(schedules);
        });
    });
  }

  getNormalizedScheduleData(schedules: TargetSchedule[]): TargetSchedule[] {
    return schedules.map((schedule: any) => {
      schedule.start = new Date(schedule.start);
      schedule.end = new Date(schedule.end);
      schedule.taskId = schedule.task.id;
      return schedule;
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

  onScheduleSelect(schedule: TargetSchedule): void {
    this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: {
        scopes: this.scopes,
        schedule,
        viewMode: true,
      },
    });
  }
}
