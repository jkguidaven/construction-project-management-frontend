import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FileUpload } from 'src/app/common/upload-file-dropbox/upload-file-dropbox.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-client-approval-task',
  templateUrl: './client-approval-task.component.html',
  styleUrls: ['./client-approval-task.component.scss'],
})
export class ClientApprovalTaskComponent implements OnInit, TaskHandler {
  @Input() task!: Task;
  @Input() scopes: ScopeOfWork[] = [];
  @Input() project!: Project;

  uploads: FileUpload[];

  processing: boolean;

  constructor(
    public router: Router,
    private taskClientAPI: TaskClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService
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

      this.uploads = this.project.attachments
        .filter((attachment) => attachment.task && attachment.task.id)
        .map((attachment) => ({
          id: attachment.id,
          name: attachment.name,
          mime: attachment.type,
          progress: 100,
        }));
    });
  }

  complete() {
    this.taskClientAPI.completeTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  updateDesignStatus(status: any): void {
    this.projectClientAPI
      .setDesignStatus(this.project.id, status.value)
      .subscribe();
  }

  onUploadChanges(uploads: FileUpload[]): void {
    this.uploads = uploads;

    for (let upload of this.uploads) {
      if (upload.id === undefined) {
        this.beginUpload(upload);
      }
    }
  }

  onUploadDelete(upload: FileUpload): void {
    if (upload.id) {
      this.attachmentClientAPI
        .deleteAttachment(this.project.id, upload.id)
        .subscribe();
    }
  }

  beginUpload(upload: FileUpload): void {
    const attachment: Attachment = {
      type: 'CONTRACT',
      file: upload.file,
      name: upload.file.name,
      task: {
        id: this.task.id,
      },
    };

    this.attachmentClientAPI
      .uploadAttachment(this.project.id, attachment)
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((event) => {
        if (event === null) {
          upload.progress = 0;
          upload.error = true;
        } else if (event.type === HttpEventType.UploadProgress) {
          upload.progress = (upload.file.size / event.total) * 100;
        } else if (event.type === HttpEventType.Response) {
          upload.progress = 100;
          upload.id === event.body.id;
          upload.name = event.body.name;
          upload.mime = event.body.mime;
        }
      });
  }

  reject(): void {
    if (!this.processing) {
      this.processing = true;
      this.projectClientAPI.reject(this.project.id, 'client').subscribe(() => {
        this.complete();
      });
    }
  }

  approve(): void {
    if (!this.processing) {
      this.processing = true;
      this.projectClientAPI.approve(this.project.id, 'client').subscribe(() => {
        this.complete();
      });
    }
  }

  get resultMessage(): string {
    return this.project.clientApprover
      ? 'This has been approved.'
      : 'This has been rejected.';
  }
}
