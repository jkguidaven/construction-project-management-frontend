import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FileUpload } from 'src/app/common/upload-file-dropbox/upload-file-dropbox.component';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-design-task',
  templateUrl: './design-task.component.html',
  styleUrls: ['./design-task.component.scss'],
})
export class DesignTaskComponent implements OnInit, TaskHandler {
  @Input() task: Task;
  @Input() project: Project;
  @Input() uploads: FileUpload[] = [];

  statusControl: FormControl = new FormControl();

  statusOptions: any[] = [
    { label: 'For Architectural Design', value: 'PENDING' },
    {
      label: `Waiting For Client's Approval`,
      value: 'WAITING_CLIENTS_APPROVAL',
    },
    { label: 'Completed', value: 'FINAL' },
  ];

  constructor(
    public router: Router,
    private attachmentClientAPI: AttachmentClientApiService,
    private taskClientAPI: TaskClientApiService,
    private projectClientAPI: ProjectClientApiService
  ) {}

  ngOnInit(): void {}

  setTask(task: Task): void {
    this.task = task;
    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;
      this.statusControl.setValue(
        this.statusOptions.find(
          (status) => status.value === this.project.designStatus
        )
      );
      this.statusControl.valueChanges.subscribe(() => {
        this.updateDesignStatus(this.statusControl.value);
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
      type: 'DESIGN',
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
}
