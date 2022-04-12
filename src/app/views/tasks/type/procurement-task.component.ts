import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AddScopeOfWorkMaterialPriceComponent } from '../../modals/add-scope-of-work-material-price.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-procurement-task',
  templateUrl: './procurement-task.component.html',
  styleUrls: ['./procurement-task.component.scss'],
})
export class ProcurementTaskComponent implements OnInit, TaskHandler {
  @Input() task: Task;
  @Input() project: Project;
  @Input() scopes: ScopeOfWork[] = [];

  saving: boolean = false;

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private taskClientAPI: TaskClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addPrice(material: ScopeOfWorkTaskMaterial): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkMaterialPriceComponent, {
      data: material,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        material.pricePerUnit = data.pricePerUnit;
      }
    });
  }

  getTotalMaterialCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return (
        total +
        (material.pricePerUnit && material.qty
          ? material.pricePerUnit * material.qty
          : 0)
      );
    }, 0);
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
    this.taskClientAPI.completeTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  hasMaterials(scope: ScopeOfWork): boolean {
    if (scope.tasks.length) {
      return Boolean(scope.tasks.find((task) => task.materials.length));
    }

    return false;
  }

  save(): Observable<ScopeOfWork[]> {
    this.saving = true;
    return this.scopeOfWorkClientAPI.define(this.project.id, this.scopes).pipe(
      finalize(() => (this.saving = false)),
      catchError(() => {
        this.snackBar.open(
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
          this.snackBar.open('Successfully saved.', null, {
            duration: 3000,
            panelClass: 'success-snack-bar',
          });
        }
        return result;
      })
    );
  }

  update(): void {
    this.save().subscribe((scopes: ScopeOfWork[]) => {
      this.scopes = this.getNormalizedData(scopes);
    });
  }

  exit(): void {
    this.router.navigate(['/tasks']);
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
