import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import {
  MaterialRequest,
  MaterialRequestItem,
} from 'src/app/models/material-request.model';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-final-approve-material-request',
  templateUrl: './final-approve-material-request.component.html',
  styleUrls: ['./final-approve-material-request.component.scss'],
})
export class FinalApproveMaterialRequestComponent
  implements OnInit, TaskHandler
{
  task!: Task;
  request: MaterialRequest;

  form: FormGroup = new FormGroup({
    project: new FormControl(undefined, [Validators.required]),
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
    status: new FormControl(undefined, [Validators.required]),
    approver: new FormControl(undefined, [Validators.required]),
  });

  processing: boolean;

  constructor(
    public router: Router,
    private materialRequestClientAPI: MaterialRequestClientApiService,
    private taskClientAPI: TaskClientApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form.get('project').disable();
    this.form.get('scope').disable();
    this.form.get('task').disable();
    this.form.get('status').disable();
    this.form.get('approver').disable();
  }

  setTask(task: Task): void {
    this.task = task;

    this.materialRequestClientAPI
      .get(task.materialRequest.id)
      .subscribe((request) => {
        this.request = request;

        this.form.get('project').setValue(this.request.project.name);
        this.form.get('scope').setValue(this.request.task.scope.name);
        this.form.get('task').setValue(this.request.task.name);
        this.form.get('status').setValue(this.request.status);
        this.form.get('approver').setValue(this.request.approver);
      });
  }

  get tasks(): ScopeOfWork[] {
    if (this.form.get('scope').value) {
      return this.form.get('scope').value.tasks;
    }

    return [];
  }

  get items(): MaterialRequestItem[] {
    return this.request.items;
  }

  exit(): void {
    this.router.navigate(['/tasks']);
  }

  complete(approve: boolean): void {
    if (approve) {
      this.approve().subscribe((scopes: MaterialRequest) => {
        if (scopes) {
          this.taskClientAPI.completeTask(this.task).subscribe(() => {
            this.exit();
          });
        }
      });
    } else {
      this.reject().subscribe((scopes: MaterialRequest) => {
        if (scopes) {
          this.taskClientAPI.completeTask(this.task).subscribe(() => {
            this.exit();
          });
        }
      });
    }
  }

  approve(): Observable<MaterialRequest> {
    this.processing = true;
    return this.materialRequestClientAPI.finalApprove(this.request.id).pipe(
      finalize(() => (this.processing = false)),
      catchError(() => {
        this._snackBar.open(
          'Something went wrong while approving the request. please try again.',
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
          this._snackBar.open('Successfully approved.', null, {
            duration: 3000,
            panelClass: 'success-snack-bar',
          });
        }
        return result;
      })
    );
  }

  reject(): Observable<MaterialRequest> {
    this.processing = true;
    return this.materialRequestClientAPI.finalReject(this.request.id).pipe(
      finalize(() => (this.processing = false)),
      catchError(() => {
        this._snackBar.open(
          'Something went wrong while rejecting the request. please try again.',
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
          this._snackBar.open('Successfully rejected.', null, {
            duration: 3000,
            panelClass: 'success-snack-bar',
          });
        }
        return result;
      })
    );
  }
}
