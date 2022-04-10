import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusBarItem } from 'src/app/common/status-bar/status-bar.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectClientAPI: ProjectClientApiService,
    private attachmentClientAPI: AttachmentClientApiService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.projectClientAPI.get(id).subscribe((project) => {
      console.log(project);
      this.project = project;
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
