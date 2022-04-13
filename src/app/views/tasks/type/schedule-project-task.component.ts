import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  GroupTask,
  Task,
} from 'src/app/common/charts/gantt-chart/gantt-chart.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { AddProjectScheduleComponent } from '../../modals/add-project-schedule.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-schedule-project-task',
  templateUrl: './schedule-project-task.component.html',
  styleUrls: ['./schedule-project-task.component.scss'],
})
export class ScheduleProjectTaskComponent implements OnInit, TaskHandler {
  @Input() task!: any;
  @Input() project!: Project;
  @Input() scopes: ScopeOfWork[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date(2023, 3, 5);
  groupTasks: GroupTask[] = [];

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService
  ) {}

  ngOnInit(): void {
    this.groupTasks = this.scopes.map((scope) => {
      const tasks: Task[] = scope.tasks.map((task) => ({
        id: task.name,
        label: task.name,
        dates: [],
      }));

      return {
        label: scope.name,
        tasks,
      };
    });
  }

  showAddProjectScheduleForm(): void {
    const dialogRef = this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: this.scopes,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const group = this.groupTasks.find(
          ({ label }) => data.scope.name === label
        );

        if (group) {
          const task = group.tasks.find(({ id }) => data.task.name === id);

          if (task) {
            task.dates.push({
              from: data.from,
              to: data.to,
              progress: 0,
            });
          }
        }
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

  setTask(task: any): void {
    this.task = task;
    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;

      this.scopeOfWorkClientAPI
        .get(this.project.id)
        .subscribe((scopes: ScopeOfWork[]) => {
          this.scopes = scopes;
        });
    });
  }
}
