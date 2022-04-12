import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Attachment } from 'src/app/models/attachment.model';
import { Project } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { AttachmentClientApiService } from 'src/app/services/attachment-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AddScopeOfWorkMaterialComponent } from '../../modals/add-scope-of-work-material.component';
import { AddScopeOfWorkTaskComponent } from '../../modals/add-scope-of-work-task.component';
import { AddScopeComponent } from '../../modals/add-scope.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-cost-estimate-task',
  templateUrl: './cost-estimate-task.component.html',
  styleUrls: ['./cost-estimate-task.component.scss'],
})
export class CostEstimateTaskComponent implements OnInit, TaskHandler {
  @Input() task!: Task;
  @Input() project!: Project;

  scopes: ScopeOfWork[] = [];
  saving: boolean;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private taskClientAPI: TaskClientApiService,
    private attachmentClientAPI: AttachmentClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getScopes(): ScopeOfWork[] {
    return this.scopes.filter((scope) => scope.type !== 'DELETE');
  }

  getTasks(scope: ScopeOfWork): ScopeOfWorkTask[] {
    return scope.tasks.filter((task) => task.type !== 'DELETE');
  }

  getMaterials(task: ScopeOfWorkTask): ScopeOfWorkTaskMaterial[] {
    return task.materials.filter((material) => material.type !== 'DELETE');
  }

  showAddScopeForm(): void {
    const dialogRef = this.dialog.open(AddScopeComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((data: ScopeOfWork) => {
      if (data) {
        this.scopes.push(data);
      }
    });
  }

  showAddScopeWorkForm(scope: ScopeOfWork): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkTaskComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((data: ScopeOfWorkTask) => {
      if (data) {
        scope.tasks.push(data);
      }
    });
  }

  deleteScope(scope: ScopeOfWork): void {
    scope.type = 'DELETE';
  }

  deleteTask(task: ScopeOfWorkTask): void {
    task.type = 'DELETE';
  }

  deleteMaterial(material: ScopeOfWorkTaskMaterial): void {
    material.type = 'DELETE';
  }

  editTask(task: ScopeOfWorkTask): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.name = data.name;
        task.qty = data.qty;
        task.unit = data.unit;
      }
    });
  }

  showAddMaterialsForm(task: ScopeOfWorkTask): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkMaterialComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.materials.push(data);
      }
    });
  }

  setTask(task: Task): void {
    this.task = task;
    this.projectClientAPI.get(task.project.id).subscribe((project) => {
      this.project = project;

      this.scopeOfWorkClientAPI
        .get(this.project.id)
        .subscribe((scopes: ScopeOfWork[]) => {
          this.scopes = this.getNormalizedData(scopes);
        });
    });
  }

  complete() {
    this.save().subscribe((scopes: ScopeOfWork[]) => {
      if (scopes) {
        this.taskClientAPI.completeTask(this.task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
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

  exit(): void {
    this.router.navigate(['/tasks']);
  }

  save(): Observable<ScopeOfWork[]> {
    this.saving = true;
    return this.scopeOfWorkClientAPI.define(this.project.id, this.scopes).pipe(
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
    this.save().subscribe((scope: ScopeOfWork[]) => {
      this.scopes = this.getNormalizedData(scope);
    });
  }

  getNormalizedData(scopes: ScopeOfWork[]): ScopeOfWork[] {
    return scopes.map((scope) => {
      scope.type = 'UPDATE';
      scope.tasks.forEach((task) => {
        task.type = 'UPDATE';

        task.materials.forEach((material) => {
          material.type = 'UPDATE';
        });
      });
      return scope;
    });
  }
}
