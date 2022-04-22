import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MaterialRequest,
  MaterialRequestItem,
} from 'src/app/models/material-request.model';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-for-purchase-order',
  templateUrl: './for-purchase-order.component.html',
  styleUrls: ['./for-purchase-order.component.scss'],
})
export class ForPurchaseOrderComponent implements OnInit, TaskHandler {
  @Input() task: Task;
  request: MaterialRequest;

  form: FormGroup = new FormGroup({
    project: new FormControl(undefined, [Validators.required]),
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
    status: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    public router: Router,
    private materialRequestClientAPI: MaterialRequestClientApiService
  ) {}

  columns: DataTableColumnDef[] = [
    { id: 'vendor', label: 'Vendor' },
    { id: 'total', label: 'Total' },
    {
      id: 'date',
      label: 'Date',
      width: '10%',
      renderer: DateDataTableRendererComponent,
    },
    {
      id: 'action',
      label: 'Action',
      width: '10%',
      renderer: ActionDataTableRendererComponent,
    },
  ];

  ngOnInit(): void {
    this.form.get('project').disable();
    this.form.get('scope').disable();
    this.form.get('task').disable();
    this.form.get('status').disable();
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
      });
  }

  get items(): MaterialRequestItem[] {
    return this.request.items;
  }

  get materials(): ScopeOfWorkTaskMaterial[] {
    if (this.form.get('task').value) {
      return this.form.get('task').value.materials;
    }
    return [];
  }
}
