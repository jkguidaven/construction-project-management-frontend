import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MaterialRequest,
  MaterialRequestItem,
} from 'src/app/models/material-request.model';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewMaterialRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({
    project: new FormControl(undefined, [Validators.required]),
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
    status: new FormControl(undefined, []),
    approver: new FormControl(undefined, []),
    finalApprover: new FormControl(undefined, []),
  });

  request: MaterialRequest;

  constructor(
    public router: Router,
    private materialRequestClientAPI: MaterialRequestClientApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form.get('project').disable();
    this.form.get('scope').disable();
    this.form.get('task').disable();
    this.form.get('status').disable();
    this.form.get('approver').disable();
    this.form.get('finalApprover').disable();

    const id = this.activatedRoute.snapshot.params['id'];
    this.materialRequestClientAPI.get(id).subscribe((request) => {
      this.request = request;

      this.form.get('project').setValue(this.request.project.name);
      this.form.get('scope').setValue(this.request.task.scope.name);
      this.form.get('task').setValue(this.request.task.name);
      this.form.get('status').setValue(this.request.status);
      this.form.get('approver').setValue(this.request.approver);
      this.form.get('finalApprover').setValue(this.request.finalApprover);
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
}
