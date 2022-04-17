import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';
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
  schedules: TargetSchedule[] = [];

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService
  ) {}

  ngOnInit(): void {}

  showAddProjectScheduleForm(): void {
    const dialogRef = this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: this.scopes,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.schedules.push(data);
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
