import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-project-schedule',
  templateUrl: './add-project-schedule.component.html',
  styleUrls: ['./add-project-schedule.component.scss'],
})
export class AddProjectScheduleComponent implements OnInit {
  form: FormGroup = new FormGroup({
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
    from: new FormControl(undefined, [Validators.required]),
    to: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public scopes: ScopeOfWork[],
    private dialogRef: MatDialogRef<AddProjectScheduleComponent>
  ) {}

  ngOnInit(): void {
    this.form.get('task').disable();
    this.form.get('scope').valueChanges.subscribe(() => {
      this.form.get('task').setValue(undefined);

      if (this.form.get('scope').value) {
        this.form.get('task').enable();
      } else {
        this.form.get('task').disable();
      }
    });
  }

  add(): void {
    this.dialogRef.close({
      scope: this.form.get('scope').value,
      task: this.form.get('task').value,
      from: this.form.get('from').value,
      to: this.form.get('to').value,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  get currentTaskList(): ScopeOfWorkTask[] {
    const scope = this.form.get('scope').value as ScopeOfWork;
    return scope ? scope.tasks : [];
  }

  get hasDates(): boolean {
    return this.form.get('from').value && this.form.get('to').value;
  }

  get scheduledDates(): Date[] {
    const ONE_DAY_IN_MS = 24 * 3600 * 1000;
    const startms = this.form.get('from').value.getTime();
    const endms = this.form.get('to').value.getTime();
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
