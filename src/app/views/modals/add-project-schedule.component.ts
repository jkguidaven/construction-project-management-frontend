import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';

interface Data {
  scopes: ScopeOfWork[];
  schedule?: TargetSchedule;
}

@Component({
  selector: 'app-add-project-schedule',
  templateUrl: './add-project-schedule.component.html',
  styleUrls: ['./add-project-schedule.component.scss'],
})
export class AddProjectScheduleComponent implements OnInit {
  form: FormGroup = new FormGroup({
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
    start: new FormControl(undefined, [Validators.required]),
    end: new FormControl(undefined, [Validators.required]),
  });
  scopes!: ScopeOfWork[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dialogRef: MatDialogRef<AddProjectScheduleComponent>
  ) {}

  ngOnInit(): void {
    this.scopes = this.data.scopes;
    this.form.get('task').disable();
    this.form.get('scope').valueChanges.subscribe(() => {
      this.form.get('task').setValue(undefined);

      if (this.form.get('scope').value) {
        this.form.get('task').enable();
      } else {
        this.form.get('task').disable();
      }
    });

    if (this.data.schedule) {
      this.form.get('start').setValue(this.data.schedule.start);
      this.form.get('end').setValue(this.data.schedule.end);

      this.scopes.forEach((scope) => {
        const task = scope.tasks.find(
          ({ id }) => this.data.schedule.taskId === id
        );

        if (task) {
          this.form.get('scope').setValue(scope);
          this.form.get('task').setValue(task);
        }
      });
    }
  }

  add(): void {
    const schedule: TargetSchedule = {
      type: this.data.schedule && this.data.schedule.id ? 'UPDATE' : 'CREATE',
      id: this.data.schedule ? this.data.schedule.id : undefined,
      taskId: this.form.get('task').value.id,
      start: this.form.get('start').value,
      end: this.form.get('end').value,
      dates: [],
    };

    this.dialogRef.close(schedule);
  }

  delete(): void {
    const schedule: TargetSchedule = {
      type: 'DELETE',
      id: this.data.schedule.id,
      taskId: this.form.get('task').value.id,
      start: this.form.get('start').value,
      end: this.form.get('end').value,
      dates: [],
    };

    this.dialogRef.close(schedule);
  }

  close(): void {
    this.dialogRef.close();
  }

  get currentTaskList(): ScopeOfWorkTask[] {
    const scope = this.form.get('scope').value as ScopeOfWork;
    return scope ? scope.tasks : [];
  }

  get hasDates(): boolean {
    return this.form.get('start').value && this.form.get('end').value;
  }

  get scheduledDates(): Date[] {
    const ONE_DAY_IN_MS = 24 * 3600 * 1000;
    const startms = this.form.get('start').value.getTime();
    const endms = this.form.get('end').value.getTime();
    const dates: Date[] = [];
    for (
      let ms = startms * 1, last = endms * 1;
      ms < last;
      ms += ONE_DAY_IN_MS
    ) {
      dates.push(new Date(ms));
    }
    return dates;
  }

  get materials(): ScopeOfWorkTaskMaterial[] {
    const task: ScopeOfWorkTask = this.form.get('task').value;

    return task ? task.materials : [];
  }
}
