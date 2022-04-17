import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StatusBarItem } from 'src/app/common/status-bar/status-bar.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScheduleProjectClientApiService } from 'src/app/services/schedule-project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { AddProjectScheduleComponent } from '../modals/add-project-schedule.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewProjectComponent implements OnInit {
  statusBarItems: StatusBarItem[] = [
    {
      label: 'Project Design',
    },
    {
      label: 'Cost Estimate',
    },
    {
      label: 'Project Approval',
    },
    {
      label: 'Active / Inprogress',
    },
    {
      label: 'Completion',
    },
  ];

  statusBarItemsCancelled: StatusBarItem[] = [
    {
      label: 'Project Design',
    },
    {
      label: 'Cost Estimate',
    },
    {
      label: 'Project Rejected',
    },
  ];

  project: Project;
  scopes: ScopeOfWork[] = [];
  schedules: TargetSchedule[] = [];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectClientAPI: ProjectClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private scheduleProjectClientAPI: ScheduleProjectClientApiService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.projectClientAPI.get(id).subscribe((project) => {
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

  get completedStatus(): number {
    switch (this.project.status) {
      case 'DESIGN':
        return 0;
      case 'DEFINE_SCOPE':
      case 'COST_ESTIMATE':
        return 1;
      case 'ACCOUNTING_APPROVAL':
      case 'STATEKHOLDER_APPROVAL':
      case 'CLIENT_APPROVAL':
        return 2;
      case 'STARTED':
        return 3;
      case 'COMPLETED':
        return 4;
    }

    return -1;
  }

  get substatus(): string {
    switch (this.project.status) {
      case 'DESIGN':
        return this.project.designStatus === 'PENDING'
          ? 'For architectural design'
          : 'For Clients Approval';
      case 'DEFINE_SCOPE':
        return 'Define Scope of Work';
      case 'COST_ESTIMATE':
        return 'Resource and Schedule Planning';
      case 'ACCOUNTING_APPROVAL':
        return 'Waitng for Budget Approval';
      case 'STATEKHOLDER_APPROVAL':
        return 'Waiting for final Budget Approval';
      case 'CLIENT_APPROVAL':
        return `Waiting for Client's Approval`;
      case 'STARTED':
        return 'Construction on going';
      case 'COMPLETED':
        return 'Project turnover';
    }

    return '';
  }

  get designStatusString(): string {
    switch (this.project.designStatus) {
      case 'PENDING':
        return 'For architectural design';
      case 'WAITING_CLIENTS_APPROVAL':
        return `Waiting Client's Approval`;
      default:
        return 'Final Design';
    }
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
}
