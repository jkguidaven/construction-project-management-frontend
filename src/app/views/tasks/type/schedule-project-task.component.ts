import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScheduleProjectClientApiService } from 'src/app/services/schedule-project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
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

  saving: boolean;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private scheduleProjectClientAPI: ScheduleProjectClientApiService,
    private taskClientAPI: TaskClientApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  showAddProjectScheduleForm(): void {
    const dialogRef = this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: {
        scopes: this.scopes,
      },
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
          this.scopes = scopes.sort((a, b) => a.id - b.id);

          this.scopes.forEach((scope) => {
            scope.tasks = scope.tasks.sort((a, b) => a.id - b.id);
          });
        });

      this.scheduleProjectClientAPI
        .get(this.project.id)
        .subscribe((schedules: TargetSchedule[]) => {
          this.schedules = this.getNormalizedData(schedules);
        });
    });
  }

  complete() {
    this.save().subscribe((scopes: TargetSchedule[]) => {
      if (scopes) {
        this.taskClientAPI.completeTask(this.task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    });
  }

  exit(): void {
    this.router.navigate(['/tasks']);
  }

  save(): Observable<TargetSchedule[]> {
    this.saving = true;
    return this.scheduleProjectClientAPI
      .define(this.project.id, this.schedules)
      .pipe(
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

  update(): void {
    this.save().subscribe((schedules: TargetSchedule[]) => {
      this.schedules = this.getNormalizedData(schedules);
    });
  }

  getNormalizedData(schedules: TargetSchedule[]): TargetSchedule[] {
    return schedules.map((schedule: any) => {
      schedule.type = 'UPDATE';

      schedule.start = new Date(schedule.start);
      schedule.end = new Date(schedule.end);
      schedule.taskId = schedule.task.id;
      return schedule;
    });
  }

  onScheduleSelect(schedule: TargetSchedule): void {
    const dialogRef = this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: {
        scopes: this.scopes,
        schedule,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        schedule.start = data.start;
        schedule.end = data.end;
        schedule.taskId = data.taskId;
        schedule.type = data.type;
        schedule.id = data.id;

        if (schedule.type === 'DELETE' && !schedule.id) {
          const index = this.schedules.indexOf(schedule);
          this.schedules.splice(index, 1);
        }
      }
    });
  }
}
