import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MaterialRequest } from 'src/app/models/material-request.model';
import { Project, ProjectPageResult } from 'src/app/models/project.model';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { ScopeOfWorkClientApiService } from 'src/app/services/scope-of-work-client-api.service';

interface MaterialInput {
  material: ScopeOfWorkTaskMaterial;
  control: FormControl;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddMaterialRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({
    project: new FormControl(undefined, [Validators.required]),
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
  });

  scopes: ScopeOfWork[] = [];
  inputs: MaterialInput[] = [];

  projects: Project[] = [];

  processing: boolean;

  constructor(
    public router: Router,
    private projectClientAPI: ProjectClientApiService,
    private scopeOfWorkClientAPI: ScopeOfWorkClientApiService,
    private materialRequestClientAPI: MaterialRequestClientApiService
  ) {}

  ngOnInit(): void {
    this.projectClientAPI
      .getAll(0, 1000, 'id', 'asc')
      .subscribe((result: ProjectPageResult) => {
        this.projects = result.results;
      });

    this.form.get('scope').disable();
    this.form.get('task').disable();
    this.form.get('project').valueChanges.subscribe((value) => {
      this.form.get('scope').setValue(undefined);

      if (value) {
        this.scopeOfWorkClientAPI.get(value.id).subscribe((scopes) => {
          this.scopes = scopes;
        });
      } else {
        this.scopes = [];
      }
      if (value) {
        this.form.get('scope').enable();
      } else {
        this.form.get('scope').disable();
      }
    });

    this.form.get('scope').valueChanges.subscribe((value) => {
      this.form.get('task').setValue(undefined);
      if (value) {
        this.form.get('task').enable();
      } else {
        this.form.get('task').disable();
      }
    });

    this.form.get('task').valueChanges.subscribe((value: ScopeOfWorkTask) => {
      if (value) {
        this.inputs = value.materials.map((material) => {
          return {
            material,
            control: new FormControl(0),
          };
        });
      } else {
        this.inputs = [];
      }
    });
  }

  get tasks(): ScopeOfWorkTask[] {
    if (this.form.get('scope').value) {
      return this.form.get('scope').value.tasks;
    }

    return [];
  }

  get hasOneInput(): boolean {
    const found = this.inputs.find((input) => input.control.value > 0);
    return Boolean(found);
  }

  submit(): void {
    this.processing = true;

    const request: MaterialRequest = {
      project: this.form.get('project').value,
      task: this.form.get('task').value,
      items: this.inputs
        .filter((input) => {
          return input.control.value > 0;
        })
        .map((input) => {
          return {
            material: input.material,
            qty: input.control.value,
          };
        }),
    };

    this.materialRequestClientAPI
      .create(request)
      .pipe(finalize(() => (this.processing = false)))
      .subscribe(() => {
        this.router.navigate(['/material-request']);
      });
  }
}
