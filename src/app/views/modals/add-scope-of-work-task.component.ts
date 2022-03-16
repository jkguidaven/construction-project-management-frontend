import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScopeOfWorkTask } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope-of-work-task',
  templateUrl: './add-scope-of-work-task.component.html',
  styleUrls: ['./add-scope-of-work-task.component.scss'],
})
export class AddScopeOfWorkTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    qty: new FormControl(undefined, []),
    unit: new FormControl('', []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScopeOfWorkTask,
    private dialogRef: MatDialogRef<AddScopeOfWorkTaskComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.get('name').setValue(this.data.name);
      this.form.get('qty').setValue(this.data.quantity);
      this.form.get('unit').setValue(this.data.unit);
    }
  }

  add(): void {
    if (this.form.valid) {
      const task: ScopeOfWorkTask = {
        name: this.form.get('name').value as string,
        quantity: this.form.get('qty').value,
        unit: this.form.get('unit').value,
      };

      this.dialogRef.close(task);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
